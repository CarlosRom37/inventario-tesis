import api from "../api/axiosConfig";
import { useState } from "react";
import EditarBienCorrienteModal from "./EditarBienCorrienteModal";

function BienCorrienteTable({ bienes, obtenerBienes }) {

    const [bienSeleccionado, setBienSeleccionado] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    const eliminarBien = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este bien?"
        );

        if (!confirmar) return;

        try {

            await api.delete(`/biens/${id}`);

            alert("Bien eliminado correctamente");

            obtenerBienes();

        } catch (error) {

            console.error(error);

            alert("Error al eliminar el bien");
        }
    };

    if (bienes.length === 0) {

        return (

            <div className="alert alert-info">
                No existen bienes corrientes registrados.
            </div>

        );
    }

    const bienesFiltrados = bienes.filter((bien) => {

        const texto = busqueda.toLowerCase();

        return (
            bien.codigo.toLowerCase().includes(texto) ||
            bien.nombre.toLowerCase().includes(texto)
        );

    });

    return (

        <>

        <div className="mb-3">

            <input
                type="text"
                className="form-control"
                placeholder="Buscar por código o nombre..."
                value={busqueda}
                onChange={(e) =>
                    setBusqueda(e.target.value)
                }
            />

        </div>

            <table className="table table-striped table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Unidad</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Stock Mínimo</th>
                        <th width="170">Acciones</th>

                    </tr>

                </thead>

                <tbody>

                {
                    bienesFiltrados.length === 0 ? (

                        <tr>
                            <td colSpan="8" className="text-center">
                                No se encontraron bienes.
                            </td>
                        </tr>

                    ) : (

                    bienesFiltrados.map((bien) => (

                        <tr key={bien.idBien}>

                            <td>{bien.codigo}</td>
                            <td>{bien.nombre}</td>
                            <td>{bien.marca}</td>
                            <td>{bien.unidadMedida}</td>
                            <td>S/. {bien.precioUnitario}</td>
                            <td>{bien.stockActual}</td>
                            <td>{bien.stockMinimo}</td>

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

                    )))}

                </tbody>

            </table>

            <EditarBienCorrienteModal
                bien={bienSeleccionado}
                obtenerBienes={obtenerBienes}
                cerrar={() => setBienSeleccionado(null)}
            />

        </>

    );

}

export default BienCorrienteTable;