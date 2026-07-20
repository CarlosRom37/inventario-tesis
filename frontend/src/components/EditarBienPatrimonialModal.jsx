import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function EditarBienPatrimonialModal({

    bien,

    obtenerBienes,

    cerrar

}) {

    const [form, setForm] = useState({

        codigo: "",

        nombre: "",

        tipoBien: "PATRIMONIAL",

        ubicacion: "",

        marca: "",

        modelo: "",

        serie: "",

        estado: "OPERATIVO",

        fechaRegistro: ""

    });

    useEffect(() => {

        if (bien) {

            setForm({

                codigo: bien.codigo,

                nombre: bien.nombre,

                tipoBien: bien.tipoBien,

                ubicacion: bien.ubicacion,

                marca: bien.marca,

                modelo: bien.modelo,

                serie: bien.serie,

                estado: bien.estado,

                fechaRegistro: bien.fechaRegistro

            });

        }

    }, [bien]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const guardarCambios = async () => {

        try {

            await api.put(`/biens/${bien.idBien}`, form);

            alert("Bien actualizado correctamente.");

            obtenerBienes();

            cerrar();

        }

        catch (error) {

            console.error(error);

            alert("Error al actualizar el bien.");

        }

    };

    if (!bien) return null;

    return (

        <div
            className="modal d-block"
            style={{
                backgroundColor: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            Editar Bien Patrimonial

                        </h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Código</label>

                                <input
                                    className="form-control"
                                    name="codigo"
                                    value={form.codigo}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Nombre</label>

                                <input
                                    className="form-control"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Marca</label>

                                <input
                                    className="form-control"
                                    name="marca"
                                    value={form.marca}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Modelo</label>

                                <input
                                    className="form-control"
                                    name="modelo"
                                    value={form.modelo}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Serie</label>

                                <input
                                    className="form-control"
                                    name="serie"
                                    value={form.serie}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Estado</label>

                                <select
                                    className="form-select"
                                    name="estado"
                                    value={form.estado}
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

                                <label>Ubicación</label>

                                <input
                                    className="form-control"
                                    name="ubicacion"
                                    value={form.ubicacion}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Fecha Registro</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="fechaRegistro"
                                    value={form.fechaRegistro}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={cerrar}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={guardarCambios}
                        >
                            Guardar cambios
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EditarBienPatrimonialModal;