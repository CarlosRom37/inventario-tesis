import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function StockMinimoAlert() {

    const [biens, setBiens] = useState([]);

    useEffect(() => {
        obtenerAlertas();
    }, []);

    const obtenerAlertas = async () => {

        try {

            const response = await api.get("/biens/stock-minimo");

            setBiens(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    if(biens.length === 0) {

        return (
            <div className="alert alert-success">
                No hay bienes con stock mínimo.
            </div>
        );
    }

    return (

        <div className="alert alert-danger">

            <h5>Bienes con stock crítico</h5>

            <ul>

                {biens.map((bien) => (

                    <li key={bien.idBien}>

                        {bien.nombre} -
                        Stock: {bien.stock}

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default StockMinimoAlert;