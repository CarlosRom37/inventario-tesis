import {
    exportarInventarioPDF
} from "../utils/exportarPDF";

import {
    exportarInventarioExcel
} from "../utils/exportarExcel";

function ReporteInventario({ bienes }) {

    const bienesCorrientes = bienes.filter(

        bien => bien.tipoBien === "CORRIENTE"

    );

    const bienesPatrimoniales = bienes.filter(

        bien => bien.tipoBien === "PATRIMONIAL"

    );

    const stockTotal = bienesCorrientes.reduce(

        (total, bien) => total + (Number(bien.stockActual) || 0),

        0

    );

    const saldoTotal = bienesCorrientes.reduce(

        (total, bien) =>

            total +

            ((Number(bien.stockActual) || 0) *

            (Number(bien.precioUnitario) || 0)),

        0

    );

    const stockBajo = bienesCorrientes.filter(

        bien => bien.stockActual <= bien.stockMinimo

    ).length;

    return (

        <div className="card shadow-sm h-100">

            <div className="card-header bg-primary text-white">

                <strong>

                    Reporte General del Inventario

                </strong>

            </div>

            <div className="mb-3">

                <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => exportarInventarioPDF(bienes)}
                >
                    PDF
                </button>

                <button
                    className="btn btn-success btn-sm"
                    onClick={() => exportarInventarioExcel(bienes)}
                >
                    Excel
                </button>

            </div>

            <div className="card-body">

                <table className="table table-bordered align-middle">

                    <tbody>

                        <tr>

                            <th>

                                Bienes Corrientes

                            </th>

                            <td className="text-end">

                                {bienesCorrientes.length}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Bienes Patrimoniales

                            </th>

                            <td className="text-end">

                                {bienesPatrimoniales.length}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Stock Total

                            </th>

                            <td className="text-end">

                                {stockTotal}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Valor Total del Inventario

                            </th>

                            <td className="text-end fw-bold text-success">

                                S/. {saldoTotal.toFixed(2)}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Productos con Stock Bajo

                            </th>

                            <td className="text-end">

                                {

                                    stockBajo > 0

                                    ?

                                    <span className="badge bg-danger">

                                        {stockBajo}

                                    </span>

                                    :

                                    <span className="badge bg-success">

                                        0

                                    </span>

                                }

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ReporteInventario;