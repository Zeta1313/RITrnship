import { useState } from "react";
import Login from "./components/Login";

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
            {!user ? (
                <Login onSuccess={setUser} />
            ) : (
                <h2>Logged In!</h2>
            )}
        </>
    );
}

export default App;