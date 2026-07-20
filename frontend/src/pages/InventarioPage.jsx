import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import InventarioFiltros from "../components/InventarioFiltros";
import InventarioCorrienteTable from "../components/InventarioCorrienteTable";
import InventarioPatrimonialTable from "../components/InventarioPatrimonialTable";
import AlertaStock from "../components/AlertaStock";
import ActualizarEstadoModal from "../components/ActualizarEstadoModal";

function InventarioPage() {

    const [bienes, setBienes] = useState([]);

    const [bienesFiltrados, setBienesFiltrados] = useState([]);

    const [tipoVista, setTipoVista] = useState("CORRIENTE");

    const [bienesStockBajo, setBienesStockBajo] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [bienSeleccionado, setBienSeleccionado] = useState(null);

    useEffect(() => {

        obtenerInventario();
        obtenerStockMinimo();

    }, []);

    const obtenerInventario = async () => {

        try {

            const response = await api.get("/biens");

            setBienes(response.data);
            setBienesFiltrados(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const obtenerStockMinimo = async () => {

        try {

            const response = await api.get("/biens/stock-minimo");

            setBienesStockBajo(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const abrirModalEstado = (bien) => {

        setBienSeleccionado(bien);
        setMostrarModal(true);

    };

    const cerrarModalEstado = () => {

        setMostrarModal(false);
        setBienSeleccionado(null);

    };

    const actualizarEstadoBien = async (nuevoEstado) => {

        try {

            await api.put(`/biens/${bienSeleccionado.idBien}`, {

                ...bienSeleccionado,

                estado: nuevoEstado

            });

            cerrarModalEstado();

            obtenerInventario();

        } catch (error) {

            console.error(error);

            alert("Error al actualizar el estado del bien.");

        }

    };

    const bienesCorrientes = bienesFiltrados.filter(

        bien => bien.tipoBien === "CORRIENTE"

    );

    const bienesPatrimoniales = bienesFiltrados.filter(

        bien => bien.tipoBien === "PATRIMONIAL"

    );

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Consulta de Inventario

            </h2>

            <div className="card shadow-sm mb-4">

                <div className="card-header bg-primary text-white">

                    Filtros de búsqueda

                </div>

                <div className="card-body">

                    <InventarioFiltros
                        bienes={bienes}
                        setBienesFiltrados={setBienesFiltrados}
                        tipoVista={tipoVista}
                    />

                </div>

            </div>

            {
                tipoVista === "CORRIENTE" && (

                    <AlertaStock
                        bienesStockBajo={bienesStockBajo}
                    />

                )
            }   

            <div className="mb-3">

                <button
                    className={
                        tipoVista === "CORRIENTE"
                            ? "btn btn-primary me-2"
                            : "btn btn-outline-primary me-2"
                    }
                    onClick={() => setTipoVista("CORRIENTE")}
                >
                    Bienes Corrientes
                </button>

                <button
                    className={
                        tipoVista === "PATRIMONIAL"
                            ? "btn btn-secondary"
                            : "btn btn-outline-secondary"
                    }
                    onClick={() => setTipoVista("PATRIMONIAL")}
                >
                    Bienes Patrimoniales
                </button>

            </div>

            <div className="card shadow-sm">

                <div className="card-header bg-dark text-white">

                    {
                        tipoVista === "CORRIENTE"
                            ? "Inventario de Bienes Corrientes"
                            : "Inventario de Bienes Patrimoniales"
                    }

                </div>

                <div className="px-3 pt-3 text-muted">

                    Mostrando{" "}

                    <strong>

                        {
                            tipoVista === "CORRIENTE"
                                ? bienesCorrientes.length
                                : bienesPatrimoniales.length
                        }

                    </strong>

                    {" "}bien(es).

                </div>

                <div className="card-body">

                    {
                        tipoVista === "CORRIENTE"

                            ?

                            <InventarioCorrienteTable
                                bienes={bienesCorrientes}
                            />

                            :

                            <InventarioPatrimonialTable
                                bienes={bienesPatrimoniales}
                                onCambiarEstado={abrirModalEstado}
                            />
                    }

                </div>

            </div>

            <ActualizarEstadoModal
                mostrar={mostrarModal}
                bienSeleccionado={bienSeleccionado}
                onClose={cerrarModalEstado}
                onGuardar={actualizarEstadoBien}
            />

        </div>

    );

}

export default InventarioPage;