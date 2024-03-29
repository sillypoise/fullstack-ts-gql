import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import "../styles/tailwind.css";
import Recipe from "./routes/$recipe";
import User from "./routes/$user";

let isDev = import.meta.env.DEV ? true : false;
let BASE_URL = isDev ? "http://localhost:8000/" : import.meta.env.BASE_URL;

let router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/recipe/:id",
        element: <Recipe />,
    },
    {
        path: "/user/:id",
        element: <User />,
    },
]);

let client = new ApolloClient({
    uri: `${BASE_URL}v1/graphql`,
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
);
