import { useState } from "react";
import api from "../api/axiosConfig";

function BienCorrienteForm({ obtenerBienes }) {

    const [bien, setBien] = useState({

        codigo: "",
        nombre: "",
        tipoBien: "CORRIENTE",


        marca: "",

        unidadMedida: "",
        precioUnitario: "",
        stockActual: "",
        stockMinimo: ""

    });

    const handleChange = (e) => {

        setBien({

            ...bien,
            [e.target.name]: e.target.value

        });

    };

    const guardarBien = async (e) => {

        e.preventDefault();

        try {

            await api.post("/biens", bien);

            alert("Bien corriente registrado correctamente");

            setBien({

                codigo: "",
                nombre: "",
                tipoBien: "CORRIENTE",

                marca: "",

                unidadMedida: "",
                precioUnitario: "",
                stockActual: "",
                stockMinimo: ""

            });

            obtenerBienes();

        } catch (error) {

            console.error(error);

            alert("Error al registrar bien");

        }

    };

    return (

        <form onSubmit={guardarBien} className="card p-4 mb-4">

            <h5 className="mb-3">
                Registrar Bien Corriente
            </h5>

            <div className="row">

                <div className="col-md-3 mb-3">

                    <input
                        type="text"
                        name="codigo"
                        placeholder="Código"
                        className="form-control"
                        value={bien.codigo}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-5 mb-3">

                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="form-control"
                        value={bien.nombre}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <input
                        type="text"
                        name="marca"
                        placeholder="Marca"
                        className="form-control"
                        value={bien.marca}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="row">

                <div className="col-md-3 mb-3">

                    <input
                        type="text"
                        name="unidadMedida"
                        placeholder="Unidad de medida"
                        className="form-control"
                        value={bien.unidadMedida}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-3 mb-3">

                    <input
                        type="number"
                        step="0.01"
                        name="precioUnitario"
                        placeholder="Precio Unitario"
                        className="form-control"
                        value={bien.precioUnitario}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-2 mb-3">

                    <input
                        type="number"
                        name="stockActual"
                        placeholder="Stock"
                        className="form-control"
                        value={bien.stockActual}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-2 mb-3">

                    <input
                        type="number"
                        name="stockMinimo"
                        placeholder="Stock mínimo"
                        className="form-control"
                        value={bien.stockMinimo}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <button className="btn btn-primary">

                Registrar Bien

            </button>

        </form>

    );

}

export default BienCorrienteForm;