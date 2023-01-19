import * as React from "react";
import "./style.css";
import { login } from "./login";
import Logo from '../../assets/images/sopra_steria.png';
import ImageLogin from '../../assets/images/ImageLoginLeft.png';


interface LoginState {
    password: string;
    username: string;
    isLoading: boolean;
    error: string;
    isLoggedIn: boolean;
}

type LoginAction =
    | { type: "login" | "success" | "error" | "logout" }
    | { type: "field"; fieldName: string; payload: string };

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
    switch (action.type) {
        case "field": {
            return {
                ...state,
                [action.fieldName]: action.payload
            };
        }
        case "login": {
            return {
                ...state,
                error: "",
                isLoading: true
            };
        }
        case "success": {
            return { ...state, error: "", isLoading: false, isLoggedIn: true };
        }
        case "error": {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                username: "",
                password: "",
                error: "Incorrect username or password!"
            };
        }
        case "logout": {
            return {
                ...state,
                isLoggedIn: false
            };
        }
        default:
            return state;
    }
};

const initialState: LoginState = {
    password: "",
    username: "",
    isLoading: false,
    error: "",
    isLoggedIn: false
};

export default function Login() {
    const [state, dispatch] = React.useReducer(loginReducer, initialState);
    const { username, password, isLoading, error, isLoggedIn } = state;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "login" });

        try {
            await login({ username, password });
            dispatch({ type: "success" });
        } catch (error) {
            dispatch({ type: "error" });
        }
    };

    return (
        <div className="App">
            <img className="ImageLogin" src={ImageLogin}/>
            <div className="login-container">
                {isLoggedIn ? (
                    <>
                        <p>{`Hello ${username}`}</p>
                        <button type="button" onClick={() => dispatch({ type: "logout" })}>
                            Log out
                        </button>
                    </>
                ) : (

                    <form className="form" onSubmit={onSubmit}>
                        {error && <p className="error">{error}</p>}
                       <img className="logo" src={Logo} />
                        <input
                            type="text"
                            placeholder="email"
                            value={username}
                            onChange={(e) =>
                                dispatch({
                                    type: "field",
                                    fieldName: "username",
                                    payload: e.currentTarget.value
                                })
                            }
                        />
                        <input
                            type="password"
                            placeholder="mot de passe"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) =>
                                dispatch({
                                    type: "field",
                                    fieldName: "password",
                                    payload: e.currentTarget.value
                                })
                            }
                        />
                        <button type="submit" className="submit" disabled={isLoading}>
                            {isLoading ? "Connexion....." : "Se Connecter"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
