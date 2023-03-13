import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import "../styles/tailwind.css";
import Recipe from "./routes/$recipe";

let router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/recipe/:id",
        element: <Recipe />,
    },
]);

let client = new ApolloClient({
    uri: "http://localhost:8000/v1/graphql",
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
);
