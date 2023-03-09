import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

let GET_USER = gql`
    query GetUser {
        user(id: 4) {
            id
            username
        }
    }
`;

function App() {
    let { loading, error, data } = useQuery(GET_USER);
    return (
        <main className="center mlb-xl">
            <article className="stack">
                <h1 className="text-4">What do I eat?</h1>
                <p>Explore and discover new recipes to cook!</p>
                <Link to="/recipe/1">Recipe 1</Link>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </article>
        </main>
    );
}

export default App;
