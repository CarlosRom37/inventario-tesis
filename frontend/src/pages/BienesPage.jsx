import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import BienForm from "../components/BienForm";
import BienTable from "../components/BienTable";

function BienesPage() {

    const [biens, setBiens] = useState([]);

    useEffect(() => {
        obtenerBiens();
    }, []);

    const obtenerBiens = async () => {

        try {

            const response = await api.get("/biens");

            console.log(response.data);
            
            setBiens(response.data);

        } catch (error) {

            console.error("Error al obtener bienes:", error);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                Gestión de Bienes

            </h2>

            <BienForm obtenerBiens={obtenerBiens} />

            <hr className="my-4" />

            <BienTable
                biens={biens}
                obtenerBiens={obtenerBiens}
            />

        </div>

    );

}

export default BienesPage;