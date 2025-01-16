// src/context/AuthContext.tsx

import {createContext, ReactNode, useContext, useEffect, useState,} from "react";
import Cookies from "js-cookie";
import {simulateDelay} from "../utils/simulateDelay"; // Your existing delay utility

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
    /** Logout user (removes isLoggedIn and isCookieAccepted from storage). */
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
    // Initialize state from session cookies
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return Cookies.get("isLoggedIn") === "true";
    });

    const [isCookieAccepted, setIsCookieAccepted] = useState<boolean>(() => {
        return Cookies.get("isCookieAccepted") === "true";
    });

    // -------------------------------
    // 1. Authentication Functions
    // -------------------------------

    // Immediate Login
    const login = (username: string, password: string) => {
        // Replace with real authentication logic
        if (username === "test" && password === "test") {
            setIsLoggedIn(true);
            Cookies.set("isLoggedIn", "true"); // Session cookie
            // Notify other tabs about login
            localStorage.setItem("auth-event", JSON.stringify({type: "login", timestamp: Date.now()}));
            return true;
        }
        return false;
    };

    // Delayed Login (0.5–5s)
    const loginDelayed = async (username: string, password: string) => {
        await simulateDelay(0.5, 3); // Implement your own delay logic
        // Replace with real authentication logic
        if (username === "test" && password === "test") {
            setIsLoggedIn(true);
            Cookies.set("isLoggedIn", "true"); // Session cookie
            // Notify other tabs about login
            localStorage.setItem("auth-event", JSON.stringify({type: "login", timestamp: Date.now()}));
            return true;
        }
        return false;
    };

    // Logout
    const logout = () => {
        setIsLoggedIn(false);
        Cookies.remove("isLoggedIn"); // Remove session cookie
        setIsCookieAccepted(false);
        Cookies.remove("isCookieAccepted"); // Remove session cookie
        // Notify other tabs about logout
        localStorage.setItem("auth-event", JSON.stringify({type: "logout", timestamp: Date.now()}));
    };

    // Accept Cookie (delayed 0.5–10s)
    const acceptCookie = async () => {
        await simulateDelay(0.5, 3); // Implement your own delay logic
        setIsCookieAccepted(true);
        Cookies.set("isCookieAccepted", "true"); // Session cookie
        // Notify other tabs about cookie acceptance
        localStorage.setItem("auth-event", JSON.stringify({type: "acceptCookie", timestamp: Date.now()}));
    };

    // -------------------------------
    // 2. Synchronize State Across Tabs
    // -------------------------------
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "auth-event" && event.newValue) {
                const {type} = JSON.parse(event.newValue);
                switch (type) {
                    case "login":
                        setIsLoggedIn(true);
                        Cookies.set("isLoggedIn", "true"); // Ensure session cookie is set
                        break;
                    case "logout":
                        setIsLoggedIn(false);
                        Cookies.remove("isLoggedIn");
                        setIsCookieAccepted(false);
                        Cookies.remove("isCookieAccepted");
                        break;
                    case "acceptCookie":
                        setIsCookieAccepted(true);
                        Cookies.set("isCookieAccepted", "true"); // Ensure session cookie is set
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

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
