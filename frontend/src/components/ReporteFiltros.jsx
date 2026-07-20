function ReporteFiltros({

    fechaInicio,

    setFechaInicio,

    fechaFin,

    setFechaFin,

    tipoMovimiento,

    setTipoMovimiento

}) {

    return (

        <div className="row">

            <div className="col-md-4 mb-3">

                <label className="form-label">

                    Desde

                </label>

                <input
                    type="date"
                    className="form-control"
                    value={fechaInicio}
                    onChange={(e) =>
                        setFechaInicio(e.target.value)
                    }
                />

            </div>

            <div className="col-md-4 mb-3">

                <label className="form-label">

                    Hasta

                </label>

                <input
                    type="date"
                    className="form-control"
                    value={fechaFin}
                    onChange={(e) =>
                        setFechaFin(e.target.value)
                    }
                />

            </div>

            <div className="col-md-4 mb-3">

                <label className="form-label">

                    Tipo de Movimiento

                </label>

                <select
                    className="form-select"
                    value={tipoMovimiento}
                    onChange={(e) =>
                        setTipoMovimiento(e.target.value)
                    }
                >

                    <option value="">

                        Todos

                    </option>

                    <option value="ENTRADA">

                        Entradas

                    </option>

                    <option value="SALIDA">

                        Salidas

                    </option>

                </select>

            </div>

        </div>

    );

}

export default ReporteFiltros;