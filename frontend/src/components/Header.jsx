import { Link, NavLink } from "react-router-dom";
import candleImg from "/candle-logo.png";

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <img
                    src={candleImg}
                    alt="Candle Logo"
                    className="logo"
                />
            </Link>

            <nav className="nav">
                <NavLink to="/" end>
                    Home
                </NavLink>

                <NavLink to="/read">
                    Read
                </NavLink>

                <NavLink to="/upload">
                    Upload
                </NavLink>

            </nav>
        </header>
    );
}
{/* <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }>Home</NavLink>
                <NavLink
                    to="/read"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }>Read</NavLink>
                <NavLink
                    to="/upload"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }>Upload</NavLink> */}