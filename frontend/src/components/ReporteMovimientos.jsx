import {
    exportarMovimientosPDF
} from "../utils/exportarPDF";

function ReporteMovimientos({ movimientos }) {

    const entradas = movimientos.filter(

        movimiento => movimiento.tipoMovimiento === "ENTRADA"

    );

    const salidas = movimientos.filter(

        movimiento => movimiento.tipoMovimiento === "SALIDA"

    );

    const totalEntradas = entradas.reduce(

        (total, movimiento) =>

            total + Number(movimiento.cantidad),

        0

    );

    const totalSalidas = salidas.reduce(

        (total, movimiento) =>

            total + Number(movimiento.cantidad),

        0

    );

    // Resumen por área
    const movimientosPorArea = {};

    movimientos.forEach((movimiento) => {

        const nombreArea = movimiento.area?.nombre || "Sin área";

        if (!movimientosPorArea[nombreArea]) {

            movimientosPorArea[nombreArea] = {

                movimientos: 0,

                entradas: 0,

                salidas: 0

            };

        }

        movimientosPorArea[nombreArea].movimientos++;

        if (movimiento.tipoMovimiento === "ENTRADA") {

            movimientosPorArea[nombreArea].entradas += Number(movimiento.cantidad);

        } else {

            movimientosPorArea[nombreArea].salidas += Number(movimiento.cantidad);

        }

    });

    return (

        <div className="card shadow-sm h-100">

            <div className="card-header bg-success text-white">

                <strong>

                    Reporte de Movimientos

                </strong>

            </div>

            <div className="mb-3">

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => exportarMovimientosPDF(movimientos)}
                >
                    PDF
                </button>

            </div>

            <div className="card-body">

                <table className="table table-bordered">

                    <tbody>

                        <tr>

                            <th>

                                Total de Movimientos

                            </th>

                            <td className="text-end">

                                {movimientos.length}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Entradas Registradas

                            </th>

                            <td className="text-end">

                                {entradas.length}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Salidas Registradas

                            </th>

                            <td className="text-end">

                                {salidas.length}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Cantidad Total Ingresada

                            </th>

                            <td className="text-end text-success fw-bold">

                                {totalEntradas}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Cantidad Total Retirada

                            </th>

                            <td className="text-end text-danger fw-bold">

                                {totalSalidas}

                            </td>

                        </tr>

                    </tbody>

                </table>

                <hr />

                <h6>

                    Resumen por Área

                </h6>

                <table className="table table-sm table-striped">

                    <thead>

                        <tr>

                            <th>

                                Área

                            </th>

                            <th className="text-center">

                                Movimientos

                            </th>

                            <th className="text-center">

                                Entradas

                            </th>

                            <th className="text-center">

                                Salidas

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            Object.entries(movimientosPorArea).map(

                                ([area, datos]) => (

                                    <tr key={area}>

                                        <td>

                                            {area}

                                        </td>

                                        <td className="text-center">

                                            {datos.movimientos}

                                        </td>

                                        <td className="text-center text-success">

                                            {datos.entradas}

                                        </td>

                                        <td className="text-center text-danger">

                                            {datos.salidas}

                                        </td>

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ReporteMovimientos;