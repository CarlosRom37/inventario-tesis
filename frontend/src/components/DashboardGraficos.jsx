import {

    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend

} from "recharts";

function DashboardGraficos({

    bienes,

    movimientos,

    fechaInicio,

    fechaFin

}) {

    // ============================================
    // Filtrar movimientos por rango de fechas
    // ============================================

    const movimientosFiltrados = movimientos.filter(movimiento => {

        if (!fechaInicio && !fechaFin) {

            return true;

        }

        const fechaMovimiento = new Date(movimiento.fechaMovimiento);

        if (fechaInicio && fechaMovimiento < new Date(fechaInicio)) {

            return false;

        }

        if (fechaFin) {

            const fin = new Date(fechaFin);

            fin.setHours(23, 59, 59, 999);

            if (fechaMovimiento > fin) {

                return false;

            }

        }

        return true;

    });

    // ============================================
    // Entradas vs Salidas
    // ============================================

    const totalEntradas = movimientosFiltrados

        .filter(

            movimiento =>

                movimiento.tipoMovimiento === "ENTRADA"

        )

        .reduce(

            (total, movimiento) =>

                total + Number(movimiento.cantidad),

            0

        );

    const totalSalidas = movimientosFiltrados

        .filter(

            movimiento =>

                movimiento.tipoMovimiento === "SALIDA"

        )

        .reduce(

            (total, movimiento) =>

                total + Number(movimiento.cantidad),

            0

        );

    const datosEntradasSalidas = [

        {

            nombre: "Entradas",

            cantidad: totalEntradas

        },

        {

            nombre: "Salidas",

            cantidad: totalSalidas

        }

    ];

    // ============================================
    // Movimientos por Área
    // ============================================

    const areas = {};

    movimientosFiltrados.forEach(movimiento => {

        const nombreArea =

            movimiento.area?.nombre ||

            "Sin área";

        areas[nombreArea] =

            (areas[nombreArea] || 0) + 1;

    });

    const datosAreas = Object.keys(areas).map(nombre => ({

        area: nombre,

        movimientos: areas[nombre]

    }));

    // ============================================
    // Distribución de Bienes
    // ============================================

    const datosTipos = [

        {

            name: "Corrientes",

            value:

                bienes.filter(

                    bien =>

                        bien.tipoBien === "CORRIENTE"

                ).length

        },

        {

            name: "Patrimoniales",

            value:

                bienes.filter(

                    bien =>

                        bien.tipoBien === "PATRIMONIAL"

                ).length

        }

    ];

    const colores = [

        "#0d6efd",

        "#6c757d"

    ];

    return (

        <div className="row">

            {/* Entradas vs Salidas */}

            <div className="col-lg-6 mb-4">

                <div className="card shadow-sm">

                    <div className="card-header bg-primary text-white">

                        Entradas vs Salidas

                    </div>

                    <div className="card-body">

                        <ResponsiveContainer

                            width="100%"

                            height={300}

                        >

                            <BarChart

                                data={datosEntradasSalidas}

                            >

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="nombre" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar

                                    dataKey="cantidad"

                                    fill="#0d6efd"

                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* Movimientos por Área */}

            <div className="col-lg-6 mb-4">

                <div className="card shadow-sm">

                    <div className="card-header bg-success text-white">

                        Movimientos por Área

                    </div>

                    <div className="card-body">

                        <ResponsiveContainer

                            width="100%"

                            height={300}

                        >

                            <BarChart

                                data={datosAreas}

                            >

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="area" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar

                                    dataKey="movimientos"

                                    fill="#198754"

                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* Distribución del Inventario */}

            <div className="col-lg-12">

                <div className="card shadow-sm">

                    <div className="card-header bg-secondary text-white">

                        Distribución de Bienes

                    </div>

                    <div className="card-body">

                        <ResponsiveContainer

                            width="100%"

                            height={350}

                        >

                            <PieChart>

                                <Pie

                                    data={datosTipos}

                                    dataKey="value"

                                    nameKey="name"

                                    outerRadius={120}

                                    label

                                >

                                    {

                                        datosTipos.map(

                                            (entry, index) => (

                                                <Cell

                                                    key={index}

                                                    fill={

                                                        colores[index]

                                                    }

                                                />

                                            )

                                        )

                                    }

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardGraficos;