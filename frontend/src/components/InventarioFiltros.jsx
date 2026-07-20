import { useEffect, useState } from "react";

function InventarioFiltros({ bienes, setBienesFiltrados }) {

    const [busqueda, setBusqueda] = useState("");

    const [estadoStock, setEstadoStock] = useState("");

    const [estadoBien, setEstadoBien] = useState("");

    useEffect(() => {

        filtrarBienes();

    }, [busqueda, estadoStock, estadoBien, bienes]);

    const filtrarBienes = () => {

        let resultado = [...bienes];

        // Buscar por código, nombre o marca
        if (busqueda.trim() !== "") {

            const texto = busqueda.toLowerCase();

            resultado = resultado.filter(bien =>

                bien.codigo?.toLowerCase().includes(texto) ||

                bien.nombre?.toLowerCase().includes(texto) ||

                bien.marca?.toLowerCase().includes(texto)

            );

        }

        // Filtro de stock (solo corrientes)
        if (estadoStock === "BAJO") {

            resultado = resultado.filter(

                bien =>

                    bien.tipoBien === "CORRIENTE" &&

                    bien.stockActual <= bien.stockMinimo

            );

        }

        if (estadoStock === "NORMAL") {

            resultado = resultado.filter(

                bien =>

                    bien.tipoBien === "CORRIENTE" &&

                    bien.stockActual > bien.stockMinimo

            );

        }

        // Estado del bien (solo patrimoniales)
        if (estadoBien !== "") {

            resultado = resultado.filter(

                bien =>

                    bien.tipoBien === "PATRIMONIAL" &&

                    bien.estado === estadoBien

            );

        }

        setBienesFiltrados(resultado);

    };

    const limpiarFiltros = () => {

        setBusqueda("");

        setEstadoStock("");

        setEstadoBien("");

    };

    return (

        <div className="row align-items-end">

            <div className="col-md-5 mb-3">

                <label className="form-label">

                    Buscar

                </label>

                <input
                    className="form-control"
                    placeholder="Código, nombre o marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

            </div>

            <div className="col-md-3 mb-3">

                <label className="form-label">

                    Estado de Stock

                </label>

                <select
                    className="form-select"
                    value={estadoStock}
                    onChange={(e) => setEstadoStock(e.target.value)}
                >

                    <option value="">Todos</option>

                    <option value="NORMAL">Stock normal</option>

                    <option value="BAJO">Stock bajo</option>

                </select>

            </div>

            <div className="col-md-2 mb-3">

                <label className="form-label">

                    Estado del Bien

                </label>

                <select
                    className="form-select"
                    value={estadoBien}
                    onChange={(e) => setEstadoBien(e.target.value)}
                >

                    <option value="">Todos</option>

                    <option value="B">Bueno</option>

                    <option value="N">Nuevo</option>

                    <option value="M">Malo</option>

                    <option value="R">Retirado</option>

                </select>

            </div>

            <div className="col-md-2 mb-3">

                <button
                    className="btn btn-secondary w-100"
                    onClick={limpiarFiltros}
                >

                    Limpiar

                </button>

            </div>

        </div>

    );

}

export default InventarioFiltros;