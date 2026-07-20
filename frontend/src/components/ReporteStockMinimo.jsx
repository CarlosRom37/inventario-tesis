import {
    exportarInventarioPDF
} from "../utils/exportarPDF";

import {
    exportarInventarioExcel
} from "../utils/exportarExcel";

function ReporteStockMinimo({ bienes }) {

    const bienesStockBajo = bienes.filter(

        bien =>

            bien.tipoBien === "CORRIENTE" &&

            bien.stockActual <= bien.stockMinimo

    );

    return (

        <div className="card shadow-sm h-100">

            <div className="card-header bg-danger text-white">

                <strong>

                    Bienes con Stock Mínimo

                </strong>

            </div>

            <div className="mb-3">

                <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => exportarInventarioPDF(bienesStockBajo)}
                >
                    PDF
                </button>

                <button
                    className="btn btn-success btn-sm"
                    onClick={() => exportarInventarioExcel(bienesStockBajo)}
                >
                    Excel
                </button>

            </div>

            <div className="card-body">

                {

                    bienesStockBajo.length === 0 ? (

                        <div className="alert alert-success mb-0">

                            No existen bienes con stock bajo.

                        </div>

                    ) : (

                        <table className="table table-sm table-bordered">

                            <thead>

                                <tr>

                                    <th>Código</th>

                                    <th>Bien</th>

                                    <th className="text-center">

                                        Stock

                                    </th>

                                    <th className="text-center">

                                        Mínimo

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    bienesStockBajo.map(bien => (

                                        <tr key={bien.idBien}>

                                            <td>

                                                {bien.codigo}

                                            </td>

                                            <td>

                                                {bien.nombre}

                                            </td>

                                            <td className="text-center text-danger fw-bold">

                                                {bien.stockActual}

                                            </td>

                                            <td className="text-center">

                                                {bien.stockMinimo}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    )

                }

            </div>

        </div>

    );

}

export default ReporteStockMinimo;