import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { nanoid } from "nanoid";

let GET_RECIPES = gql`
    query GetUser {
        recipes(limit: 50) {
            id
            title
            description
            author {
                username
            }
        }
    }
`;

function App() {
    let { loading, error, data } = useQuery(GET_RECIPES);
    let recipes = data?.recipes;
    if (error) return <p>Error :(</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <main className="center mlb-xl">
            <article className="stack [--stack-gap:var(--space-m)] items-start">
                <h1 className="text-4">What do I eat?</h1>
                <p>Explore and discover new recipes to cook!</p>
                {recipes?.map((recipe: any) => (
                    <article
                        className="stack [--stack-gap:var(--space-2xs)] items-start"
                        key={nanoid()}
                    >
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                        <p className="text-0">By {recipe.author.username}</p>
                    </article>
                ))}
            </article>
        </main>
    );
}

export default App;
