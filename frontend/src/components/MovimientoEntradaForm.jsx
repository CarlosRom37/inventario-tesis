import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axiosConfig";

function MovimientoEntradaForm({ obtenerMovimientos }) {

    const [bienes, setBienes] = useState([]);

    const [bienSeleccionado, setBienSeleccionado] = useState(null);

    const [form, setForm] = useState({

        bienId: "",

        areaId: "",

        cantidad: "",

        observacion: ""

    });

    const [areas, setAreas] = useState([]);

    // Cargar bienes corrientes
    useEffect(() => {

        obtenerBienes();

        obtenerAreas();

    }, []);

    const obtenerBienes = async () => {

        try {

            const response = await api.get("/biens/corrientes");

            setBienes(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const obtenerAreas = async () => {

        try {

            const response = await api.get("/areas");

            setAreas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    // Seleccionar bien
    const seleccionarBien = (e) => {

        const id = Number(e.target.value);

        const bien = bienes.find(b => b.idBien === id);

        setBienSeleccionado(bien);

        setForm({

            ...form,

            bienId: id

        });

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const registrarEntrada = async (e) => {

        e.preventDefault();

        try {

            await api.post("/movimientos/entrada", null, {

                params: {

                    bienId: form.bienId,

                    usuarioId: 1,

                    areaId: Number(form.areaId),

                    cantidad: Number(form.cantidad),

                    observacion: form.observacion

                }

            });

            alert("Entrada registrada correctamente.");

            // Actualiza historial
            obtenerMovimientos();

            // Recargar bienes para obtener el nuevo stock
            const response = await api.get("/biens/corrientes");

            setBienes(response.data);

            // Actualizar el bien mostrado
            const actualizado = response.data.find(

                b => b.idBien === Number(form.bienId)

            );

            setBienSeleccionado(actualizado);

            // Limpiar únicamente los campos del movimiento
            setForm({

                bienId: actualizado.idBien,

                areaId: "",

                cantidad: "",

                observacion: ""

            });

        }

        catch (error) {

            console.error(error);

            alert("No fue posible registrar la entrada.");

        }

    };

    return (

        <form onSubmit={registrarEntrada}>

            <div className="row">

                <div className="col-md-5 mb-3">

                    <label className="form-label">

                        Bien

                    </label>

                    <Select
                        placeholder="Seleccione un bien..."
                        isClearable
                        options={bienes.map(bien => ({
                            value: bien.idBien,
                            label: `${bien.codigo} - ${bien.nombre}`
                        }))}
                        value={
                            bienes
                                .filter(bien => bien.idBien === Number(form.bienId))
                                .map(bien => ({
                                    value: bien.idBien,
                                    label: `${bien.codigo} - ${bien.nombre}`
                                }))[0] || null
                        }
                        onChange={(opcion) =>

                            seleccionarBien({

                                target: {

                                    name: "bienId",

                                    value: opcion ? opcion.value : ""

                                }

                            })

                        }
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Área

                    </label>

                    <select
                        className="form-select"
                        name="areaId"
                        value={form.areaId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Seleccione un área...

                        </option>

                        {

                            areas.map(area => (

                                <option
                                    key={area.idArea}
                                    value={area.idArea}
                                >

                                    {area.nombre}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="col-md-3 mb-3">

                    <label className="form-label">

                        Cantidad

                    </label>

                    <input

                        type="number"

                        min="1"

                        className="form-control"

                        name="cantidad"

                        value={form.cantidad}

                        onChange={handleChange}

                        required

                    />

                </div>

            </div>

            {
                bienSeleccionado && (

                    <div className="card mb-3">

                        <div className="card-header">

                            Información del bien

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-3">

                                    <strong>Código</strong>

                                    <br />

                                    {bienSeleccionado.codigo}

                                </div>

                                <div className="col-md-3">

                                    <strong>Nombre</strong>

                                    <br />

                                    {bienSeleccionado.nombre}

                                </div>

                                <div className="col-md-3">

                                    <strong>Stock actual</strong>

                                    <br />

                                    {bienSeleccionado.stockActual}

                                </div>

                                <div className="col-md-3">

                                    <strong>Ubicación</strong>

                                    <br />

                                    {bienSeleccionado.ubicacion}

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }

            <div className="mb-3">

                <label className="form-label">

                    Observación

                </label>

                <textarea

                    className="form-control"

                    rows="3"

                    name="observacion"

                    value={form.observacion}

                    onChange={handleChange}

                />

            </div>

            <button
                className="btn btn-success"
                type="submit"
                disabled={!bienSeleccionado}
            >
                Registrar Entrada
            </button>

        </form>

    );

}

export default MovimientoEntradaForm;