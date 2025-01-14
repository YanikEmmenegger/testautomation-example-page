// src/context/AuthContext.tsx

import  {
    createContext,
    useState,
    useContext,
    ReactNode
} from "react";
import { simulateDelay } from "../utils/simulateDelay";

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
    /** Logout user (removes isLoggedIn from session). */
    logout: () => void;
    /**
     * Delayed cookie acceptance (0.5–10s).
     * After acceptance, isCookieAccepted is true in session storage.
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
    // 1. Lazy Initialization of State
    // -------------------------------
    const storedLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const storedCookieAccepted =
        sessionStorage.getItem("isCookieAccepted") === "true";

    const [isLoggedIn, setIsLoggedIn] = useState(storedLoggedIn);
    const [isCookieAccepted, setIsCookieAccepted] = useState(storedCookieAccepted);

    // -------------------------------
    // 2. Immediate Login
    // -------------------------------
    const login = (username: string, password: string) => {
        if (username === "test" && password === "test") {
            setIsLoggedIn(true);
            sessionStorage.setItem("isLoggedIn", "true");
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
            sessionStorage.setItem("isLoggedIn", "true");
            return true;
        }
        return false;
    };

    // -------------------------------
    // 4. Logout
    // -------------------------------
    const logout = () => {
        // Remove "isLoggedIn"
        setIsLoggedIn(false);
        sessionStorage.removeItem("isLoggedIn");

        // (Optional) Remove "isCookieAccepted" if you want the banner to show again:
        setIsCookieAccepted(false);
        sessionStorage.removeItem("isCookieAccepted");
    };

    // -------------------------------
    // 5. Accept Cookie (delayed 0.5–10s)
    // -------------------------------
    const acceptCookie = async () => {
        await simulateDelay(0.5, 2);
        setIsCookieAccepted(true);
        sessionStorage.setItem("isCookieAccepted", "true");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isCookieAccepted,
                login,
                loginDelayed,
                logout,
                acceptCookie
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
