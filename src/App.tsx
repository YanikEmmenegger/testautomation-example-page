// src/App.tsx
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import Challenge1App from "./pages/challenge1/Challenge1App";
import Challenge2App from "./pages/challenge2/Challenge2App.tsx";
import Challenge3App from "./pages/challenge3/Challenge3App.tsx";
import ToastProvider from "./context/ToastProvider.tsx"; // The "mini-app" for Challenge #1

function App() {
    return (
        <>
            {/*/!* Global Nav (optional) *!/*/}
            {/*<nav className="bg-blue-600 p-4">*/}
            {/*    <ul className="flex space-x-4 text-white">*/}
            {/*        <li>*/}
            {/*            <Link to="/" className="font-semibold hover:text-gray-200">*/}
            {/*                Home*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        /!* Possibly other links *!/*/}
            {/*    </ul>*/}
            {/*</nav>*/}
            <ToastProvider/>
            <main>
                <Routes>
                    {/* Home page */}
                    <Route path="/" element={<Home />} />

                    {/* CHALLENGE 1 mini-app routes */}
                    <Route path="/challenge-1/*" element={<Challenge1App />} />
                    <Route path="/challenge-2/*" element={<Challenge2App />} />
                    <Route path="/challenge-3/*" element={<Challenge3App/>}/>

                    {/* Other challenges... */}
                </Routes>
            </main>
        </>
    );
}

export default App;
