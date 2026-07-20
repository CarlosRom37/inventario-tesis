import { useState } from "react";
import api from "../api/axiosConfig";

function MovimientoForm({ tipo, obtenerBiens }) {

    const [datos, setDatos] = useState({
        bienId: "",
        usuarioId: "",
        cantidad: "",
        observacion: ""
    });

    const handleChange = (e) => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const registrarMovimiento = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                `/movimientos/${tipo.toLowerCase()}?bienId=${datos.bienId}&usuarioId=${datos.usuarioId}&cantidad=${datos.cantidad}&observacion=${datos.observacion}`
            );

            alert(`${tipo} registrada correctamente`);

            setDatos({
                bienId: "",
                usuarioId: "",
                cantidad: "",
                observacion: ""
            });

            obtenerBiens();

        } catch (error) {

            console.error(error);
            alert("Error en movimiento");
        }
    };

    return (

        <form onSubmit={registrarMovimiento} className="border p-3 mb-3">

            <h5>{tipo} de Inventario</h5>

            <div className="row">

                <div className="col-md-3">
                    <input
                        type="number"
                        name="bienId"
                        placeholder="ID Bien"
                        className="form-control"
                        value={datos.bienId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <input
                        type="number"
                        name="usuarioId"
                        placeholder="ID Usuario"
                        className="form-control"
                        value={datos.usuarioId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <input
                        type="number"
                        name="cantidad"
                        placeholder="Cantidad"
                        className="form-control"
                        value={datos.cantidad}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-3">
                    <input
                        type="text"
                        name="observacion"
                        placeholder="Observación"
                        className="form-control"
                        value={datos.observacion}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <button className="btn btn-success mt-3">
                Registrar {tipo}
            </button>

        </form>
    );
}

export default MovimientoForm;