import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// export const NODE_SERVER_URI = "http://localhost:3001/graphql";
export const NODE_SERVER_URI = "http://eatin.cs.colman.ac.il:3001/graphql";
// export const PYTHON_SERVER_URI = "http://localhost:8000/graphql";
export const PYTHON_SERVER_URI = "http://eatin.cs.colman.ac.il:8000/graphql";

const client = new ApolloClient({
    uri: NODE_SERVER_URI,
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
);
