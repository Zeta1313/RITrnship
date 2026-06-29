import { useGoogleLogin } from "@react-oauth/google";

function Login({ onSuccess }) {
    const login = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/calendar.readonly",
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            onSuccess(tokenResponse.access_token);
        },
        onError: () => {
            console.log("Login Failed");
        }
    });

    return (
        <button onClick={() => login()}>
            Sign in with Google
        </button>
    );
}

export default Login;