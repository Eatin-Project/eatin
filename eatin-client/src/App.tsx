import "./App.css";

import { Router } from "./Router/Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import React from "react";

function App() {
  return (
    <div className="eatin-app">
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
