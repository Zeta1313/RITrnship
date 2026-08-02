import { useCalendar } from "../services/AuthContext";

function Settings() {
    const { logout } = useCalendar();

    return (
        <main className="page stack-lg">
            <header className="page-header">
                <h1>Settings</h1>

                <p>
                    Configure application preferences and manage your account.
                </p>
            </header>

            <section className="card stack">
                <h2>Account</h2>

                <p>
                    Sign out of your Google account used to access calendar data.
                </p>

                <div className="section-actions">
                    <button
                        className="button-secondary"
                        onClick={logout}
                    >
                        Log Out
                    </button>
                </div>
            </section>

            <section className="card stack">
                <h2>Coming Soon</h2>

                <p>
                    Additional application settings will be available here in a future update.
                </p>
            </section>
        </main>
    );
}

export default Settings;