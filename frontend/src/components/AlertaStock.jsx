import { useState } from "react";

function AlertaStock({ bienesStockBajo }) {

    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    if (bienesStockBajo.length === 0) {

        return (

            <div className="alert alert-success">

                <strong>

                    No existen bienes con stock mínimo.

                </strong>

            </div>

        );

    }

    return (

        <div className="alert alert-warning">

            <div className="d-flex justify-content-between align-items-center">

                <div>

                    <h5 className="mb-1">

                        ⚠ Alerta de Stock Mínimo

                    </h5>

                    <p className="mb-0">

                        Existen{" "}

                        <strong>

                            {bienesStockBajo.length}

                        </strong>

                        {" "}bien(es) que requieren reposición.

                    </p>

                </div>

                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() =>
                        setMostrarDetalle(!mostrarDetalle)
                    }
                >

                    {
                        mostrarDetalle
                            ? "Ocultar detalle"
                            : "Ver detalle"
                    }

                </button>

            </div>

            {

                mostrarDetalle && (

                    <div className="mt-3">

                        <table className="table table-sm table-bordered mb-0">

                            <thead>

                                <tr>

                                    <th>Código</th>

                                    <th>Bien</th>

                                    <th>Stock Actual</th>

                                    <th>Stock Mínimo</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    bienesStockBajo.map((bien) => (

                                        <tr key={bien.idBien}>

                                            <td>

                                                {bien.codigo}

                                            </td>

                                            <td>

                                                {bien.nombre}

                                            </td>

                                            <td>

                                                <span className="badge bg-danger">

                                                    {bien.stockActual}

                                                </span>

                                            </td>

                                            <td>

                                                {bien.stockMinimo}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    );

}

export default AlertaStock;