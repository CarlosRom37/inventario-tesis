import api from "../api/axiosConfig";

function BienTable({ biens, obtenerBiens }) {

    const eliminarBien = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este bien?"
        );

        if (!confirmar) return;

        try {

            await api.delete(`/biens/${id}`);

            alert("Bien eliminado correctamente.");

            obtenerBiens();

        } catch (error) {

            console.error(error);

            alert("Error al eliminar el bien.");

        }
    };

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Marca</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Stock</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {biens.length === 0 ? (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center"
                            >

                                No existen bienes registrados.

                            </td>

                        </tr>

                    ) : (

                        biens.map((bien) => (

                            <tr key={bien.idBien}>

                                <td>{bien.codigo}</td>

                                <td>{bien.nombre}</td>

                                <td>

                                    {bien.tipoBien === "CORRIENTE"
                                        ? "Corriente"
                                        : "Patrimonial"}

                                </td>

                                <td>{bien.marca}</td>

                                <td>{bien.ubicacion}</td>

                                <td>

                                    {bien.tipoBien === "CORRIENTE"
                                        ? "N/A"
                                        : bien.estado}

                                </td>

                                <td>

                                    {bien.tipoBien === "CORRIENTE"
                                        ? bien.stockActual
                                        : "N/A"}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        disabled
                                    >

                                        Editar

                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            eliminarBien(bien.idBien)
                                        }
                                    >

                                        Eliminar

                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default BienTable;