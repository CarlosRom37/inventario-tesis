function DashboardFiltros({

    fechaInicio,

    setFechaInicio,

    fechaFin,

    setFechaFin

}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">

                Filtrar Movimientos por Período

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-5">

                        <label className="form-label">

                            Fecha Inicio

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

                    <div className="col-md-5">

                        <label className="form-label">

                            Fecha Fin

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

                    <div className="col-md-2 d-flex align-items-end">

                        <button

                            className="btn btn-secondary w-100"

                            onClick={() => {

                                setFechaInicio("");

                                setFechaFin("");

                            }}

                        >

                            Limpiar

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardFiltros;