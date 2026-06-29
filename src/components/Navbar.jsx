import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 2rem",
                borderBottom: "1px solid #ccc",
                marginBottom: "2rem"
            }}
        >
            <h2 style={{ margin: 0 }}>
                Calendar Task Manager
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "1rem"
                }}
            >
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        fontWeight: isActive ? "bold" : "normal"
                    })}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/prompt"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        fontWeight: isActive ? "bold" : "normal"
                    })}
                >
                    AI Prompt
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;