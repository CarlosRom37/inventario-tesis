import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export const exportarInventarioPDF = (bienes) => {

    const doc = new jsPDF();

    doc.text(
        "Reporte de Inventario",
        14,
        15
    );


    autoTable(doc, {

        startY: 25,

        head: [

            [
                "Código",
                "Nombre",
                "Tipo",
                "Stock",
                "Saldo"
            ]

        ],

        body: bienes.map(bien => [

            bien.codigo,

            bien.nombre,

            bien.tipoBien,

            bien.stockActual ?? "-",

            bien.precioUnitario
                ?
                `S/. ${(bien.precioUnitario * bien.stockActual).toFixed(2)}`
                :
                "-"

        ])

    });


    doc.save(
        "reporte-inventario.pdf"
    );

};



export const exportarMovimientosPDF = (movimientos) => {

    const doc = new jsPDF();


    doc.text(
        "Reporte de Movimientos",
        14,
        15
    );


    autoTable(doc, {

        startY: 25,

        head: [

            [
                "Fecha",
                "Tipo",
                "Bien",
                "Cantidad"
            ]

        ],

        body: movimientos.map(movimiento => [

            movimiento.fechaMovimiento,

            movimiento.tipoMovimiento,

            movimiento.bien?.nombre,

            movimiento.cantidad

        ])

    });


    doc.save(
        "reporte-movimientos.pdf"
    );

};