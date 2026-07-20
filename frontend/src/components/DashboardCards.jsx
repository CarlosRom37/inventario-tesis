function DashboardCards({

    totalBienes,

    totalCorrientes,

    totalPatrimoniales,

    stockBajo,

    valorInventario

}) {

    return (

        <div className="row mb-4">

            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

                <div className="card text-white bg-primary shadow h-100">

                    <div className="card-body text-center">

                        <h6 className="card-title">

                            Total de Bienes

                        </h6>

                        <h2>

                            {totalBienes}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

                <div className="card text-white bg-success shadow h-100">

                    <div className="card-body text-center">

                        <h6 className="card-title">

                            Bienes Corrientes

                        </h6>

                        <h2>

                            {totalCorrientes}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

                <div className="card text-white bg-secondary shadow h-100">

                    <div className="card-body text-center">

                        <h6 className="card-title">

                            Bienes Patrimoniales

                        </h6>

                        <h2>

                            {totalPatrimoniales}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

                <div className="card text-white bg-danger shadow h-100">

                    <div className="card-body text-center">

                        <h6 className="card-title">

                            Stock Bajo

                        </h6>

                        <h2>

                            {stockBajo}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-4 col-md-8 col-sm-12 mb-3">

                <div className="card text-white bg-dark shadow h-100">

                    <div className="card-body text-center">

                        <h6 className="card-title">

                            Valor Total del Inventario

                        </h6>

                        <h2>

                            S/. {valorInventario.toLocaleString("es-PE", {

                                minimumFractionDigits: 2,

                                maximumFractionDigits: 2

                            })}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCards;