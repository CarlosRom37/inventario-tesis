import * as XLSX from "xlsx";


export const exportarInventarioExcel = (bienes) => {


    const datos = bienes.map(bien => ({


        Código: bien.codigo,

        Nombre: bien.nombre,

        Tipo: bien.tipoBien,

        Stock: bien.stockActual ?? "",

        "Precio Unitario": bien.precioUnitario ?? "",

        Saldo:

            bien.precioUnitario

                ?

                bien.precioUnitario *
                bien.stockActual

                :

                ""


    }));


    const hoja = XLSX.utils.json_to_sheet(datos);


    const libro = XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(

        libro,

        hoja,

        "Inventario"

    );


    XLSX.writeFile(

        libro,

        "inventario.xlsx"

    );

};