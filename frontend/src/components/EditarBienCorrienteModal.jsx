import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function EditarBienCorrienteModal({
    bien,
    obtenerBienes,
    cerrar
}) {

    const [form, setForm] = useState({

        codigo: "",
        nombre: "",
        tipoBien: "CORRIENTE",
        ubicacion: "",

        marca: "",
        unidadMedida: "",
        precioUnitario: "",
        stockActual: "",
        stockMinimo: ""

    });

    useEffect(() => {

        if (bien) {

            setForm({

                codigo: bien.codigo,
                nombre: bien.nombre,
                tipoBien: bien.tipoBien,

                ubicacion: bien.ubicacion,

                marca: bien.marca,
                unidadMedida: bien.unidadMedida,

                precioUnitario: bien.precioUnitario,
                stockActual: bien.stockActual,
                stockMinimo: bien.stockMinimo

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

            alert("Bien actualizado correctamente");

            obtenerBienes();

            cerrar();

        } catch (error) {

            console.error(error);

            alert("Error al actualizar el bien");

        }

    };

    if (!bien) return null;

    return (

        <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            Editar Bien Corriente

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

                            <div className="col-md-6 mb-3">

                                <label>Marca</label>

                                <input
                                    className="form-control"
                                    name="marca"
                                    value={form.marca}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Unidad de medida</label>

                                <input
                                    className="form-control"
                                    name="unidadMedida"
                                    value={form.unidadMedida}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Precio</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="precioUnitario"
                                    value={form.precioUnitario}
                                    onChange={handleChange}
                                />

                            </div>

                            {/*<div className="col-md-4 mb-3">

                                <label>Stock</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="stockActual"
                                    value={form.stockActual}
                                    onChange={handleChange}
                                />

                            </div>*/}

                            <div className="col-md-4 mb-3">

                                <label>Stock mínimo</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="stockMinimo"
                                    value={form.stockMinimo}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-12">

                                <label>Ubicación</label>

                                <input
                                    className="form-control"
                                    name="ubicacion"
                                    value={form.ubicacion}
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

export default EditarBienCorrienteModal;