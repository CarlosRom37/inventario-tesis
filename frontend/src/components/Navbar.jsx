import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    Sistema de Inventarios
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/corrientes"
                                        ? "active"
                                        : ""
                                }`}
                                to="/corrientes"
                            >
                                Bienes Corrientes
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/patrimoniales"
                                        ? "active"
                                        : ""
                                }`}
                                to="/patrimoniales"
                            >
                                Bienes Patrimoniales
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/movimientos"
                                        ? "active"
                                        : ""
                                }`}
                                to="/movimientos"
                            >
                                Movimientos
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/inventario"
                                        ? "active"
                                        : ""
                                }`}
                                to="/inventario"
                            >
                                Inventario
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/reportes"
                                        ? "active"
                                        : ""
                                }`}
                                to="/reportes"
                            >
                                Reportes
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/dashboard"
                                        ? "active"
                                        : ""
                                }`}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;