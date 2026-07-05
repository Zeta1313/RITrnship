import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() => {
        return sessionStorage.getItem("accessToken") || null;
    });

    useEffect(() => {
        if (accessToken) {
            sessionStorage.setItem("accessToken", accessToken);
        } else {
            sessionStorage.removeItem("accessToken");
        }
    }, [accessToken]);

    function logout() {
        setAccessToken(null);
        sessionStorage.removeItem("accessToken");
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}