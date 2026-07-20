import { useEffect, useState } from "react";

function ActualizarEstadoModal({

    mostrar,

    bienSeleccionado,

    onClose,

    onGuardar

}) {

    const [estado, setEstado] = useState("N");

    useEffect(() => {

        if (bienSeleccionado) {

            setEstado(bienSeleccionado.estado || "N");

        }

    }, [bienSeleccionado]);

    if (!mostrar) return null;
    if (!bienSeleccionado) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Actualizar Estado del Bien

                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <p>

                            <strong>Código:</strong>{" "}
                            {bienSeleccionado.codigo}

                        </p>

                        <p>

                            <strong>Bien:</strong>{" "}
                            {bienSeleccionado.nombre}

                        </p>

                        <div className="mb-3">

                            <label className="form-label">

                                Nuevo Estado

                            </label>

                            <select
                                className="form-select"
                                value={estado}
                                onChange={(e) =>
                                    setEstado(e.target.value)
                                }
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

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cancelar

                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => onGuardar(estado)}
                        >

                            Guardar Cambios

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ActualizarEstadoModal;