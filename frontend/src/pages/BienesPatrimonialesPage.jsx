import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import BienPatrimonialForm from "../components/BienPatrimonialForm";
import BienPatrimonialTable from "../components/BienPatrimonialTable";

function BienesPatrimonialesPage() {

    const [bienes, setBienes] = useState([]);

    const obtenerBienes = async () => {

        try {

            const response = await api.get(
                "/biens/buscar/tipo?tipoBien=PATRIMONIAL"
            );

            setBienes(response.data);

        } catch (error) {

            console.error(error);

            alert("No fue posible obtener los bienes patrimoniales.");

        }

    };

    useEffect(() => {

        obtenerBienes();

    }, []);

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Gestión de Bienes Patrimoniales

            </h2>

            <BienPatrimonialForm
                obtenerBienes={obtenerBienes}
            />

            <BienPatrimonialTable
                bienes={bienes}
                obtenerBienes={obtenerBienes}
            />

        </div>

    );

}

export default BienesPatrimonialesPage;