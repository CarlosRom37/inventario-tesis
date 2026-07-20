import { useState } from "react";

function InventarioCorrienteTable({ bienes }) {

    const [ordenAscendente, setOrdenAscendente] = useState(true);

    if (bienes.length === 0) {

        return (

            <div className="alert alert-info">

                No existen bienes corrientes.

            </div>

        );

    }

    const bienesOrdenados = [...bienes].sort((a, b) => {

        if (ordenAscendente) {

            return a.nombre.localeCompare(b.nombre);

        }

        return b.nombre.localeCompare(a.nombre);

    });

    const saldoTotal = bienes.reduce(

        (total, bien) =>

            total +

            (Number(bien.precioUnitario) || 0) *

            (Number(bien.stockActual) || 0),

        0

    );

    return (

        <>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="mb-0">

                    Bienes encontrados: {bienes.length}

                </h5>

                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setOrdenAscendente(!ordenAscendente)}
                >
                    Ordenar por nombre {ordenAscendente ? "▲" : "▼"}
                </button>

            </div>

            <table className="table table-striped table-bordered align-middle">

                <thead className="table-primary">

                    <tr>

                        <th>Código</th>

                        <th>Nombre</th>

                        <th>Marca</th>

                        <th>Área</th>

                        <th className="text-center">

                            Stock

                        </th>

                        <th className="text-center">

                            Stock mínimo

                        </th>

                        <th className="text-end">

                            Precio Unitario

                        </th>

                        <th className="text-end">

                            Saldo

                        </th>

                        <th className="text-center">

                            Estado

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bienesOrdenados.map((bien) => {

                            const saldo =

                                (Number(bien.precioUnitario) || 0) *

                                (Number(bien.stockActual) || 0);

                            return (

                                <tr key={bien.idBien}>

                                    <td>

                                        {bien.codigo}

                                    </td>

                                    <td>

                                        {bien.nombre}

                                    </td>

                                    <td>

                                        {bien.marca || "-"}

                                    </td>

                                    <td>

                                        <span className="text-muted">

                                            Distribuido por áreas

                                        </span>

                                    </td>

                                    <td className="text-center">

                                        {bien.stockActual}

                                    </td>

                                    <td className="text-center">

                                        {bien.stockMinimo}

                                    </td>

                                    <td className="text-end">

                                        S/. {(Number(bien.precioUnitario) || 0).toFixed(2)}

                                    </td>

                                    <td className="text-end fw-bold">

                                        S/. {saldo.toFixed(2)}

                                    </td>

                                    <td className="text-center">

                                        {

                                            bien.stockActual <= bien.stockMinimo

                                                ?

                                                <span className="badge bg-danger">

                                                    Stock bajo

                                                </span>

                                                :

                                                <span className="badge bg-success">

                                                    Stock normal

                                                </span>

                                        }

                                    </td>

                                </tr>

                            );

                        })

                    }

                </tbody>

                <tfoot className="table-light">

                    <tr>

                        <th colSpan="7" className="text-end">

                            Saldo Total del Inventario

                        </th>

                        <th className="text-end">

                            S/. {saldoTotal.toFixed(2)}

                        </th>

                        <th></th>

                    </tr>

                </tfoot>

            </table>

        </>

    );

}

export default InventarioCorrienteTable;