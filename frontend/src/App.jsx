import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import BienesCorrientesPage from "./pages/BienesCorrientesPage";
import BienesPatrimonialesPage from "./pages/BienesPatrimonialesPage";
import MovimientosPage from "./pages/MovimientosPage";
import InventarioPage from "./pages/InventarioPage";
import ReportesPage from "./pages/ReportesPage";
import DashboardPage from "./pages/DashboardPage";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<BienesCorrientesPage />}
                />

                <Route
                    path="/corrientes"
                    element={<BienesCorrientesPage />}
                />

                <Route
                    path="/patrimoniales"
                    element={<BienesPatrimonialesPage />}
                />

                <Route
                    path="/movimientos"
                    element={<MovimientosPage />}
                />

                <Route
                    path="/inventario"
                    element={<InventarioPage />}
                />

                <Route
                    path="/reportes"
                    element={<ReportesPage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

            </Routes>

        </>

    );

}

export default App;