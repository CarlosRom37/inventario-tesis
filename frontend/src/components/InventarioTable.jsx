function InventarioTable({ bienes }) {

    if (bienes.length === 0) {

        return (

            <div className="alert alert-info">

                No existen bienes registrados.

            </div>

        );

    }

    // Total del inventario (solo bienes corrientes)
    const totalInventario = bienes
        .filter(bien => bien.tipoBien === "CORRIENTE")
        .reduce(
            (total, bien) =>
                total + (Number(bien.precioUnitario) * Number(bien.stockActual)),
            0
        );

    return (

        <>

            <table className="table table-striped table-bordered align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>Código</th>

                        <th>Nombre</th>

                        <th>Tipo</th>

                        <th>Marca</th>

                        <th>Área / Ubicación</th>

                        <th>Stock</th>

                        <th>Stock mínimo</th>

                        <th>Precio Unitario</th>

                        <th>Saldo</th>

                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bienes.map((bien) => {

                            const saldo =
                                Number(bien.precioUnitario || 0) *
                                Number(bien.stockActual || 0);

                            return (

                                <tr key={bien.idBien}>

                                    <td>

                                        {bien.codigo}

                                    </td>

                                    <td>

                                        {bien.nombre}

                                    </td>

                                    <td>

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                <span className="badge bg-primary">

                                                    Corriente

                                                </span>

                                                :

                                                <span className="badge bg-secondary">

                                                    Patrimonial

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        {bien.marca}

                                    </td>

                                    <td>

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                <span className="text-muted">

                                                    Distribuido por áreas

                                                </span>

                                                :

                                                bien.ubicacion

                                        }

                                    </td>

                                    <td className="text-center">

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                bien.stockActual

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td className="text-center">

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                bien.stockMinimo

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td className="text-end">

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                `S/. ${Number(bien.precioUnitario).toFixed(2)}`

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td className="text-end">

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                <strong>

                                                    S/. {saldo.toFixed(2)}

                                                </strong>

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            bien.tipoBien === "CORRIENTE"

                                                ?

                                                (

                                                    bien.stockActual <= bien.stockMinimo

                                                        ?

                                                        <span className="badge bg-danger">

                                                            Stock bajo

                                                        </span>

                                                        :

                                                        <span className="badge bg-success">

                                                            Stock normal

                                                        </span>

                                                )

                                                :

                                                <span className="badge bg-info">

                                                    {bien.estado}

                                                </span>

                                        }

                                    </td>

                                </tr>

                            );

                        })

                    }

                </tbody>

            </table>

            <div className="card mt-3">

                <div className="card-body text-end">

                    <h5 className="mb-0">

                        Valor total del inventario:

                        <span className="text-success ms-2">

                            S/. {totalInventario.toFixed(2)}

                        </span>

                    </h5>

                </div>

            </div>

        </>

    );

}

export default InventarioTable;