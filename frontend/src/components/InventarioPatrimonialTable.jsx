import { useState } from "react";
import ActualizarEstadoModal from "./ActualizarEstadoModal";

function InventarioPatrimonialTable({
    bienes,
    onCambiarEstado
}) {

    const [mostrarModal, setMostrarModal] = useState(false);

    const [bienSeleccionado, setBienSeleccionado] = useState(null);

    const [paginaActual, setPaginaActual] = useState(1);

    const registrosPorPagina = 100;

    const cambiarPagina = (numeroPagina) => {

        setPaginaActual(numeroPagina);

    };

    const abrirModal = (bien) => {

        setBienSeleccionado(bien);
        setMostrarModal(true);

    };

    const cerrarModal = () => {

        setMostrarModal(false);
        setBienSeleccionado(null);

    };

    if (bienes.length === 0) {

        return (

            <div className="alert alert-info">

                No existen bienes patrimoniales registrados.

            </div>

        );

    }

    const obtenerEstado = (estado) => {

        switch (estado) {

            case "N":

                return {
                    texto: "Nuevo",
                    clase: "bg-primary"
                };

            case "B":

                return {
                    texto: "Bueno",
                    clase: "bg-success"
                };

            case "M":

                return {
                    texto: "Malogrado",
                    clase: "bg-warning text-dark"
                };

            case "R":

                return {
                    texto: "Retirado",
                    clase: "bg-danger"
                };

            default:

                return {
                    texto: "Sin estado",
                    clase: "bg-secondary"
                };

        }

    };

    const bienesOrdenados = [...bienes].sort((a, b) =>
        a.codigo.localeCompare(b.codigo)
    );

    const indiceUltimo = paginaActual * registrosPorPagina;

    const indicePrimero = indiceUltimo - registrosPorPagina;

    const bienesPagina = bienesOrdenados.slice(
        indicePrimero,
        indiceUltimo
    );

    const totalPaginas = Math.ceil(
        bienes.length / registrosPorPagina
    );


    return (

        <>

            <div style={{ maxHeight: "600px", overflowY: "auto" }}>

            <table className="table table-striped table-bordered align-middle mb-0">

                <thead className="table-secondary">

                    <tr>

                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Serie</th>
                        <th>Ubicación</th>

                        <th className="text-center">

                            Estado

                        </th>

                        <th>

                            Fecha de Registro

                        </th>

                        <th className="text-center">

                            Acciones

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bienesPagina.map((bien) => {

                                const estado = obtenerEstado(
                                    bien.estado
                                );

                                return (

                                    <tr key={bien.idBien}>

                                        <td>{bien.codigo}</td>

                                        <td>{bien.nombre}</td>

                                        <td>{bien.marca || "-"}</td>

                                        <td>{bien.modelo || "-"}</td>

                                        <td>{bien.serie || "-"}</td>

                                        <td>{bien.ubicacion || "-"}</td>

                                        <td className="text-center">

                                            <span className={`badge ${estado.clase}`}>

                                                {estado.texto}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                bien.fechaRegistro

                                                    ? new Date(
                                                        bien.fechaRegistro
                                                    ).toLocaleDateString("es-PE")

                                                    : "-"

                                            }

                                        </td>

                                        <td className="text-center">

                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => onCambiarEstado(bien)}
                                            >

                                                Cambiar Estado

                                            </button>

                                        </td>

                                    </tr>

                                );

                            })

                    }

                </tbody>

            </table>

            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">

                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>


                <nav>

                    <ul className="pagination mb-0">


                        <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>

                            <button
                                className="page-link"
                                onClick={() => cambiarPagina(paginaActual - 1)}
                                disabled={paginaActual === 1}
                            >

                                Anterior

                            </button>

                        </li>


                        <li className="page-item active">

                            <span className="page-link">

                                {paginaActual}

                            </span>

                        </li>


                        <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>

                            <button
                                className="page-link"
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                            >

                                Siguiente

                            </button>

                        </li>


                    </ul>

                </nav>

            </div>

            <ActualizarEstadoModal

                mostrar={mostrarModal}

                cerrar={cerrarModal}

                bien={bienSeleccionado}

                onActualizar={onCambiarEstado}

            />

        </>

    );

}

export default InventarioPatrimonialTable;