import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import ReporteFiltros from "../components/ReporteFiltros";
import ReporteInventario from "../components/ReporteInventario";
import ReporteMovimientos from "../components/ReporteMovimientos";
import ReporteStockMinimo from "../components/ReporteStockMinimo";

function ReportesPage() {

    const [inventario, setInventario] = useState([]);
    const [inventarioFiltrado, setInventarioFiltrado] = useState([]);

    const [movimientos, setMovimientos] = useState([]);
    const [movimientosFiltrados, setMovimientosFiltrados] = useState([]);

    const [bienesStockMinimo, setBienesStockMinimo] = useState([]);

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = async () => {

        try {

            const [
                inventarioResponse,
                movimientosResponse,
                stockMinimoResponse
            ] = await Promise.all([

                api.get("/biens"),
                api.get("/movimientos"),
                api.get("/biens/stock-minimo")

            ]);

            setInventario(inventarioResponse.data);
            setInventarioFiltrado(inventarioResponse.data);

            setMovimientos(movimientosResponse.data);
            setMovimientosFiltrados(movimientosResponse.data);

            setBienesStockMinimo(stockMinimoResponse.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Reportes

            </h2>

            <div className="card shadow-sm mb-4">

                <div className="card-header bg-primary text-white">

                    Filtros de Reportes

                </div>

                <div className="card-body">

                    <ReporteFiltros

                        inventario={inventario}
                        movimientos={movimientos}

                        setInventarioFiltrado={setInventarioFiltrado}
                        setMovimientosFiltrados={setMovimientosFiltrados}

                    />

                </div>

            </div>

            <div className="row">

                <div className="col-lg-6 mb-4">

                    <ReporteInventario

                        bienes={inventarioFiltrado}

                    />

                </div>

                <div className="col-lg-6 mb-4">

                    <ReporteMovimientos

                        movimientos={movimientosFiltrados}

                    />

                </div>

            </div>

            <ReporteStockMinimo

                bienes={bienesStockMinimo}

            />

        </div>

    );

}

export default ReportesPage;