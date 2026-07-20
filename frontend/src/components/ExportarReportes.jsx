import {
    exportarInventarioPDF,
    exportarMovimientosPDF
} from "../utils/exportarPDF";

import {
    exportarInventarioExcel
} from "../utils/exportarExcel";

function ExportarReportes({

    inventario,

    movimientos

}) {

    return (

        <div className="mb-3">

            <button
                className="btn btn-danger me-2"
                onClick={() => exportarInventarioPDF(inventario)}
            >
                Exportar Inventario PDF
            </button>

            <button
                className="btn btn-success me-2"
                onClick={() => exportarInventarioExcel(inventario)}
            >
                Exportar Inventario Excel
            </button>

            <button
                className="btn btn-warning"
                onClick={() => exportarMovimientosPDF(movimientos)}
            >
                Exportar Movimientos PDF
            </button>

        </div>

    );

}

export default ExportarReportes;