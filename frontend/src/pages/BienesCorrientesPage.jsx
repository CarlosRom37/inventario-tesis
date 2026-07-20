import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import BienCorrienteForm from "../components/BienCorrienteForm";
import BienCorrienteTable from "../components/BienCorrienteTable";

function BienesCorrientesPage() {

    const [bienes, setBienes] = useState([]);

    useEffect(() => {
        obtenerBienes();
    }, []);

    const obtenerBienes = async () => {

        try {

            const response = await api.get("/biens/corrientes");

            setBienes(response.data);

        } catch (error) {

            console.error("Error al obtener bienes corrientes", error);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Gestión de Bienes Corrientes
            </h2>

            <BienCorrienteForm
                obtenerBienes={obtenerBienes}
            />

            <BienCorrienteTable
                bienes={bienes}
                obtenerBienes={obtenerBienes}
            />

        </div>

    );

}

export default BienesCorrientesPage;