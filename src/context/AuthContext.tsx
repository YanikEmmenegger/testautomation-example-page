// src/context/AuthContext.tsx
import {createContext, ReactNode, useContext, useState,} from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    login: () => false,
    logout: () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    // 1. Check Session Storage to set initial logged-in state
    const initialLoginState = sessionStorage.getItem("isLoggedIn") === "true";
    const [isLoggedIn, setIsLoggedIn] = useState(initialLoginState);

    // 2. Login: hard-coded credentials, store in session
    const login = (username: string, password: string) => {
        if (username === "test" && password === "test") {
            setIsLoggedIn(true);
            sessionStorage.setItem("isLoggedIn", "true");
            return true;
        }
        return false;
    };

    // 3. Logout: remove from session storage
    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem("isLoggedIn");
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
