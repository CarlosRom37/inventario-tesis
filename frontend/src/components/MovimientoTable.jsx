function MovimientoTable({ movimientos }) {

    if (movimientos.length === 0) {

        return (

            <div className="alert alert-info">

                No existen movimientos registrados.

            </div>

        );

    }

    return (

        <table className="table table-striped table-bordered">

            <thead className="table-dark">

                <tr>

                    <th>Fecha</th>

                    <th>Tipo</th>

                    <th>Código</th>

                    <th>Bien</th>

                    <th>Área</th>

                    <th className="text-center">

                        Cantidad

                    </th>

                    <th className="text-center">

                        Movimiento de Stock

                    </th>

                    <th>Usuario</th>

                    <th>Observación</th>

                </tr>

            </thead>

            <tbody>

                {

                    [...movimientos]

                        .sort(

                            (a, b) =>

                                new Date(b.fechaMovimiento) -

                                new Date(a.fechaMovimiento)

                        )

                        .map((movimiento) => (

                            <tr key={movimiento.idMovimiento}>

                                <td>

                                    {

                                        new Date(

                                            movimiento.fechaMovimiento

                                        ).toLocaleString()

                                    }

                                </td>

                                <td className="text-center">

                                    {

                                        movimiento.tipoMovimiento === "ENTRADA"

                                            ?

                                            <span className="badge bg-success">

                                                Entrada

                                            </span>

                                            :

                                            <span className="badge bg-danger">

                                                Salida

                                            </span>

                                    }

                                </td>

                                <td>

                                    {movimiento.bien?.codigo}

                                </td>

                                <td>

                                    {movimiento.bien?.nombre}

                                </td>

                                <td>

                                    {movimiento.area?.nombre ?? "-"}

                                </td>

                                <td className="text-center">

                                    {movimiento.cantidad}

                                </td>

                                <td className="text-center">

                                    {movimiento.stockAnterior}

                                    {" → "}

                                    <strong>

                                        {movimiento.stockNuevo}

                                    </strong>

                                </td>

                                <td>

                                    {movimiento.usuario?.nombre ?? "-"}

                                </td>

                                <td>

                                    {movimiento.observacion || "-"}

                                </td>

                            </tr>

                        ))

                }

            </tbody>

        </table>

    );

}

export default MovimientoTable;