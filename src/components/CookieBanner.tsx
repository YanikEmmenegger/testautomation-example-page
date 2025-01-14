// src/components/CookieBanner.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const CookieBanner: React.FC = () => {
    const { isCookieAccepted, acceptCookie } = useAuth();
    const [loading, setLoading] = useState(false);

    // If cookies already accepted, banner is hidden
    if (isCookieAccepted) {
        return null;
    }

    const handleAccept = async () => {
        setLoading(true);
        try {
            await acceptCookie(); // triggers the random delay, then sets isCookieAccepted to true
        } finally {
            setLoading(false);
        }
        // Once isCookieAccepted is true, the component will re-render and return null
    };

    return (
        <div className="fixed left-0 bottom-0 w-full bg-gray-800 text-white p-4">
            <div className="max-w-xl mx-auto flex items-center justify-between">
                <p>
                    This website uses cookies to improve your experience. By clicking
                    "Accept", you agree to the usage of these cookies.
                </p>
                <button
                    onClick={handleAccept}
                    className="ml-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                    disabled={loading} // Optionally disable button while loading
                >
                    {loading ? "Accepting..." : "Accept"}
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
