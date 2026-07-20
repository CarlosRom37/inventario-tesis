import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axiosConfig";

function MovimientoSalidaForm({ obtenerMovimientos }) {

    const [bienes, setBienes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [bienSeleccionado, setBienSeleccionado] = useState(null);

    const [form, setForm] = useState({

        bienId: "",
        areaId: "",
        cantidad: "",
        observacion: ""

    });

    useEffect(() => {

        cargarBienes();
        cargarAreas();

    }, []);

    const cargarBienes = async () => {

        try {

            const response = await api.get("/biens/corrientes");

            setBienes(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const cargarAreas = async () => {

        try {

            const response = await api.get("/areas");

            setAreas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const seleccionarBien = (e) => {

        const id = e.target.value;

        const bien = bienes.find(b => b.idBien == id);

        setBienSeleccionado(bien);

        setForm({

            ...form,

            bienId: id

        });

    };

    const registrarSalida = async (e) => {

        e.preventDefault();

        try {

            await api.post("/movimientos/salida", null, {

                params: {

                    bienId: form.bienId,

                    usuarioId: 1,

                    areaId: form.areaId,

                    cantidad: Number(form.cantidad),

                    observacion: form.observacion

                }

            });

            alert("Salida registrada correctamente.");

            setForm({

                bienId: "",
                areaId: "",
                cantidad: "",
                observacion: ""

            });

            setBienSeleccionado(null);

            obtenerMovimientos();

            cargarBienes();

        } catch (error) {

            if (error.response?.data?.message) {

                alert(error.response.data.message);

            } else {

                alert("Stock insuficiente o error al registrar la salida.");

            }

        }

    };

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-danger text-white">

                <strong>Registrar salida</strong>

            </div>

            <div className="card-body">

                <form onSubmit={registrarSalida}>

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
                        className="btn btn-danger"
                        type="submit"
                        disabled={!bienSeleccionado}
                    >

                        Registrar salida

                    </button>

                </form>

            </div>

        </div>

    );

}

export default MovimientoSalidaForm;