import { useState } from "react";
import api from "../api/axiosConfig";

function BienForm({ obtenerBiens }) {

    const [bien, setBien] = useState({

        codigo: "",
        nombre: "",
        tipoBien: "CORRIENTE",

        ubicacion: "",
        marca: "",

        unidadMedida: "",
        precioUnitario: "",
        stockActual: "",
        stockMinimo: "",

        modelo: "",
        serie: "",
        estado: "OPERATIVO"
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

            alert("Bien registrado correctamente");

            setBien({

                codigo: "",
                nombre: "",
                tipoBien: "CORRIENTE",

                ubicacion: "",
                marca: "",

                unidadMedida: "",
                precioUnitario: "",
                stockActual: "",
                stockMinimo: "",

                modelo: "",
                serie: "",
                estado: "OPERATIVO"

            });

            obtenerBiens();

        } catch (error) {

            console.error(error);

            alert("Error al registrar bien");
        }
    };

    return (

        <form onSubmit={guardarBien}>

            {/* FILA 1 */}

            <div className="row mb-3">

                <div className="col-md-3">

                    <input
                        type="text"
                        className="form-control"
                        name="codigo"
                        placeholder="Código"
                        value={bien.codigo}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-5">

                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre del bien"
                        value={bien.nombre}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-4">

                    <select
                        className="form-select"
                        name="tipoBien"
                        value={bien.tipoBien}
                        onChange={handleChange}
                    >

                        <option value="CORRIENTE">
                            Bien Corriente
                        </option>

                        <option value="PATRIMONIAL">
                            Bien Patrimonial
                        </option>

                    </select>

                </div>

            </div>

            {/* FILA 2 */}

            <div className="row mb-3">

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control"
                        name="marca"
                        placeholder="Marca"
                        value={bien.marca}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control"
                        name="ubicacion"
                        placeholder="Ubicación"
                        value={bien.ubicacion}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            {/* BIEN CORRIENTE */}

            {bien.tipoBien === "CORRIENTE" && (

                <div className="row mb-3">

                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            name="unidadMedida"
                            placeholder="Unidad"
                            value={bien.unidadMedida}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="precioUnitario"
                            placeholder="Precio"
                            value={bien.precioUnitario}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            type="number"
                            className="form-control"
                            name="stockActual"
                            placeholder="Stock"
                            value={bien.stockActual}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            type="number"
                            className="form-control"
                            name="stockMinimo"
                            placeholder="Stock mínimo"
                            value={bien.stockMinimo}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

            )}

            {/* BIEN PATRIMONIAL */}

            {bien.tipoBien === "PATRIMONIAL" && (

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            name="modelo"
                            placeholder="Modelo"
                            value={bien.modelo}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            name="serie"
                            placeholder="Serie"
                            value={bien.serie}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            name="estado"
                            value={bien.estado}
                            onChange={handleChange}
                        >

                            <option value="OPERATIVO">
                                Operativo
                            </option>

                            <option value="MANTENIMIENTO">
                                Mantenimiento
                            </option>

                            <option value="BAJA">
                                Baja
                            </option>

                        </select>

                    </div>

                </div>

            )}

            <button
                className="btn btn-primary"
                type="submit"
            >
                Registrar Bien
            </button>

        </form>

    );
}

export default BienForm;