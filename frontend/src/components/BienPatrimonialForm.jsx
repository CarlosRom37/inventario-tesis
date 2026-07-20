import { useState } from "react";
import api from "../api/axiosConfig";

function BienPatrimonialForm({ obtenerBienes }) {

    const [bien, setBien] = useState({

        codigo: "",
        nombre: "",

        tipoBien: "PATRIMONIAL",

        ubicacion: "",

        marca: "",
        modelo: "",
        serie: "",

        estado: "N",

        fechaRegistro: ""

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

            alert("Bien patrimonial registrado correctamente.");

            setBien({

                codigo: "",
                nombre: "",

                tipoBien: "PATRIMONIAL",

                ubicacion: "",

                marca: "",
                modelo: "",
                serie: "",

                estado: "N",

                fechaRegistro: ""

            });

            obtenerBienes();

        } catch (error) {

            console.error(error);

            alert("Error al registrar el bien.");

        }

    };

    return (

        <form onSubmit={guardarBien} className="card p-3 mb-4">

            <h5 className="mb-3">

                Registrar Bien Patrimonial

            </h5>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Código

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="codigo"
                        value={bien.codigo}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-8 mb-3">

                    <label className="form-label">

                        Nombre

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={bien.nombre}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Marca

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="marca"
                        value={bien.marca}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Modelo

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="modelo"
                        value={bien.modelo}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Serie

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="serie"
                        value={bien.serie}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Estado

                    </label>

                    <select
                        className="form-select"
                        name="estado"
                        value={bien.estado}
                        onChange={handleChange}
                    >

                        <option value="N">
                            Nuevo
                        </option>

                        <option value="B">
                            Bueno
                        </option>

                        <option value="M">
                            Malogrado
                        </option>

                        <option value="R">
                            Retirado
                        </option>

                    </select>

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Ubicación

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="ubicacion"
                        value={bien.ubicacion}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Fecha de registro

                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="fechaRegistro"
                        value={bien.fechaRegistro}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="text-end">

                <button className="btn btn-success">

                    Registrar Bien Patrimonial

                </button>

            </div>

        </form>

    );

}

export default BienPatrimonialForm;