import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import DashboardCards from "../components/DashboardCards";
import DashboardFiltros from "../components/DashboardFiltros";
import DashboardGraficos from "../components/DashboardGraficos";

function DashboardPage() {

    const [bienes, setBienes] = useState([]);

    const [movimientos, setMovimientos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState("");

    const [fechaFin, setFechaFin] = useState("");

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = async () => {

        try {

            const [

                bienesResponse,

                movimientosResponse

            ] = await Promise.all([

                api.get("/biens"),

                api.get("/movimientos")

            ]);

            setBienes(bienesResponse.data);

            setMovimientos(movimientosResponse.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const totalBienes = bienes.length;

    const totalCorrientes = bienes.filter(

        bien => bien.tipoBien === "CORRIENTE"

    ).length;

    const totalPatrimoniales = bienes.filter(

        bien => bien.tipoBien === "PATRIMONIAL"

    ).length;

    const stockBajo = bienes.filter(

        bien =>

            bien.tipoBien === "CORRIENTE" &&

            bien.stockActual <= bien.stockMinimo

    ).length;

    const valorInventario = bienes.reduce(

        (total, bien) =>

            total +

            (

                (Number(bien.precioUnitario) || 0)

                *

                (Number(bien.stockActual) || 0)

            ),

        0

    );

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Dashboard

            </h2>

            <DashboardCards

                totalBienes={totalBienes}

                totalCorrientes={totalCorrientes}

                totalPatrimoniales={totalPatrimoniales}

                stockBajo={stockBajo}

                valorInventario={valorInventario}

            />

            <DashboardFiltros

                fechaInicio={fechaInicio}

                setFechaInicio={setFechaInicio}

                fechaFin={fechaFin}

                setFechaFin={setFechaFin}

            />

            <DashboardGraficos

                bienes={bienes}

                movimientos={movimientos}

                fechaInicio={fechaInicio}

                fechaFin={fechaFin}

            />

        </div>

    );

}

export default DashboardPage;