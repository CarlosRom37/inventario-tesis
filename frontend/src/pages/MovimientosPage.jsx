import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import MovimientoEntradaForm from "../components/MovimientoEntradaForm";
import MovimientoTable from "../components/MovimientoTable";
import MovimientoSalidaForm from "../components/MovimientoSalidaForm";

function MovimientosPage() {

    const [movimientos, setMovimientos] = useState([]);

    const obtenerMovimientos = async () => {

        try {

            const response = await api.get("/movimientos");

            setMovimientos(response.data);

        } catch (error) {

            console.error(error);

            alert("No fue posible obtener los movimientos.");

        }

    };

    useEffect(() => {

        obtenerMovimientos();

    }, []);

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Movimientos de Bienes Corrientes

            </h2>

            {/* ENTRADAS */}

            <div className="card shadow-sm mb-4">

                <div className="card-header bg-success text-white">

                    Registrar Entrada

                </div>

                <div className="card-body">

                    <MovimientoEntradaForm
                        obtenerMovimientos={obtenerMovimientos}
                    />

                </div>

            </div>

            {/* SALIDAS */}

            <div className="card shadow-sm mb-4">

                <div className="card-header bg-danger text-white">

                    Registrar Salida

                </div>

                <div className="card-body">

                    <MovimientoSalidaForm
                        obtenerMovimientos={obtenerMovimientos}
                    />

                </div>

            </div>

            {/* HISTORIAL */}

            <div className="card shadow-sm">

                <div className="card-header bg-dark text-white">

                    Historial de Movimientos

                </div>

                <div className="card-body">

                    <MovimientoTable
                        movimientos={movimientos}
                    />

                </div>

            </div>

        </div>

    );

}

export default MovimientosPage;