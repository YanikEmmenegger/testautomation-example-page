// src/context/AuthContext.tsx

import {createContext, ReactNode, useContext, useState,} from "react";
import Cookies from "js-cookie"; // Import js-cookie
import {simulateDelay} from "../utils/simulateDelay";

interface AuthContextProps {
    /** Whether the user is currently logged in */
    isLoggedIn: boolean;
    /** Whether the user accepted the cookie banner */
    isCookieAccepted: boolean;
    /**
     * Immediate login (no random delay).
     * Returns true if credentials are correct, otherwise false.
     */
    login: (username: string, password: string) => boolean;
    /**
     * Delayed login (random 0.5–5s).
     * Returns true if credentials are correct, otherwise false.
     */
    loginDelayed: (username: string, password: string) => Promise<boolean>;
    /** Logout user (removes isLoggedIn from storage). */
    logout: () => void;
    /**
     * Delayed cookie acceptance (0.5–10s).
     * After acceptance, isCookieAccepted is true in storage.
     */
    acceptCookie: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    isCookieAccepted: false,
    login: () => false,
    loginDelayed: async () => false,
    logout: () => undefined,
    acceptCookie: async () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // -------------------------------
    // 1. Initialization from Cookies
    // -------------------------------
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const loggedIn = Cookies.get("isLoggedIn");
        return loggedIn === "true";
    });

    const [isCookieAccepted, setIsCookieAccepted] = useState<boolean>(() => {
        const cookieAccepted = Cookies.get("isCookieAccepted");
        return cookieAccepted === "true";
    });

    // -------------------------------
    // 2. Immediate Login
    // -------------------------------
    const login = (username: string, password: string) => {
        if (username === "test" && password === "test") {
            setIsLoggedIn(true);
            Cookies.set("isLoggedIn", "true"); // Session cookie by default
            return true;
        }
        return false;
    };

    // -------------------------------
    // 3. Delayed Login (0.5–5s)
    // -------------------------------
    const loginDelayed = async (username: string, password: string) => {
        await simulateDelay(0.5, 5); // random delay
        if (username === "test" && password === "test") {
            setIsLoggedIn(true);
            Cookies.set("isLoggedIn", "true");
            return true;
        }
        return false;
    };

    // -------------------------------
    // 4. Logout
    // -------------------------------
    const logout = () => {
        setIsLoggedIn(false);
        Cookies.remove("isLoggedIn");

        // Optionally remove isCookieAccepted if you want the banner to show again:
        setIsCookieAccepted(false);
        Cookies.remove("isCookieAccepted");
    };

    // -------------------------------
    // 5. Accept Cookie (delayed 0.5–10s)
    // -------------------------------
    const acceptCookie = async () => {
        await simulateDelay(0.5, 10);
        setIsCookieAccepted(true);
        Cookies.set("isCookieAccepted", "true");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isCookieAccepted,
                login,
                loginDelayed,
                logout,
                acceptCookie,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
