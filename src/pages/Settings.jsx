import { AuthProvider, useAuth } from "../services/AuthContext";

function Settings() {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Settings</h1>
            <button onClick={logout}>
                Log Out
            </button>
        </div>
    );
}

export default Settings;