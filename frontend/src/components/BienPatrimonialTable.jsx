import { useState } from "react";
import api from "../api/axiosConfig";
import EditarBienPatrimonialModal from "./EditarBienPatrimonialModal";

function BienPatrimonialTable({ bienes, obtenerBienes }) {

    const [bienSeleccionado, setBienSeleccionado] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    const [paginaActual, setPaginaActual] = useState(1);

    const registrosPorPagina = 100;

    const eliminarBien = async (id) => {

        const confirmar = window.confirm(
            "¿Desea eliminar este bien patrimonial?"
        );

        if (!confirmar) return;

        try {

            await api.delete(`/biens/${id}`);

            alert("Bien eliminado correctamente.");

            obtenerBienes();

        } catch (error) {

            console.error(error);

            alert("No fue posible eliminar el bien.");

        }

    };

    const bienesFiltrados = bienes.filter((bien) => {

        const texto = busqueda.toLowerCase();

        return (
            bien.codigo.toLowerCase().includes(texto) ||
            bien.nombre.toLowerCase().includes(texto)
        );

    });

    if (bienes.length === 0) {

        return (

            <div className="alert alert-info">

                No existen bienes patrimoniales registrados.

            </div>

        );

    }

    /*const bienesOrdenados = [...bienes].sort((a, b) => {

        return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);

    });*/

    const bienesOrdenados = [...bienesFiltrados].sort((a, b) => {

        if (!a.fechaRegistro) return 1;

        if (!b.fechaRegistro) return -1;

        return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);

    });

    const indiceUltimo = paginaActual * registrosPorPagina;

    const indicePrimero = indiceUltimo - registrosPorPagina;

    const bienesPagina = bienesOrdenados.slice(
        indicePrimero,
        indiceUltimo
    );

    /*const totalPaginas = Math.ceil(
        bienes.length / registrosPorPagina
    );*/

    const totalPaginas = Math.ceil(
        bienesFiltrados.length / registrosPorPagina
    );

    const cambiarPagina = (numeroPagina) => {

        setPaginaActual(numeroPagina);

    };

    return (

        <>

            <div className="mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por código o nombre..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPaginaActual(1);
                    }}
                />

            </div>

            <table className="table table-striped table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Serie</th>
                        <th>Estado</th>
                        <th>Ubicación</th>
                        <th>Fecha Registro</th>

                        <th width="170">

                            Acciones

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bienesPagina.map((bien) => (

                            <tr key={bien.idBien}>

                                <td>{bien.codigo}</td>

                                <td>{bien.nombre}</td>

                                <td>{bien.marca}</td>

                                <td>{bien.modelo}</td>

                                <td>{bien.serie}</td>

                                <td>{bien.estado}</td>

                                <td>{bien.ubicacion}</td>

                                <td>{bien.fechaRegistro}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => setBienSeleccionado(bien)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarBien(bien.idBien)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">

                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>


                <nav>

                    <ul className="pagination mb-0">

                        <li 
                            className={`page-item ${
                                paginaActual === 1 ? "disabled" : ""
                            }`}
                        >

                            <button
                                className="page-link"
                                disabled={paginaActual === 1}
                                onClick={() =>
                                    cambiarPagina(paginaActual - 1)
                                }
                            >
                                Anterior
                            </button>

                        </li>


                        <li className="page-item active">

                            <span className="page-link">

                                {paginaActual}

                            </span>

                        </li>


                        <li 
                            className={`page-item ${
                                paginaActual === totalPaginas ? "disabled" : ""
                            }`}
                        >

                            <button
                                className="page-link"
                                disabled={paginaActual === totalPaginas}
                                onClick={() =>
                                    cambiarPagina(paginaActual + 1)
                                }
                            >
                                Siguiente
                            </button>

                        </li>

                    </ul>

                </nav>

            </div>

            <EditarBienPatrimonialModal

                bien={bienSeleccionado}

                obtenerBienes={obtenerBienes}

                cerrar={() => setBienSeleccionado(null)}

            />

        </>

    );

}

export default BienPatrimonialTable;