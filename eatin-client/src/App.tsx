import "./App.css";

import {Router} from "./components/Router/Router";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import {ToastNotification} from "./components/ui/ToastNotification";
import React from "react";
import {SearchProvider} from "./context/search-context";

function App() {
    return (
        <div className="eatin-app">
            <AuthProvider>
                <SearchProvider>
                    <BrowserRouter>
                        <Router/>
                    </BrowserRouter>
                </SearchProvider>
            </AuthProvider>
            <ToastNotification/>
        </div>
    );
}

export default App;
