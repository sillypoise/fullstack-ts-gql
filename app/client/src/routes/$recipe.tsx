import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { nanoid } from "nanoid";
import { ImageWrapper } from "../components/ImageWrapper";

export default function Recipe() {
    let params = useParams();
    let recipe_id = params.id;
    let GET_RECIPE = gql`
        query GetRecipeById {
            recipe(id: ${recipe_id}) {
                id
                title
                description
                instructions
                ingredients
                image_url
                author {
                    username
                }
            }
        }
    `;
    let { loading, error, data } = useQuery(GET_RECIPE);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    let recipe = data.recipe;

    return (
        <main className="center mlb-xl">
            <article className="stack">
                {loading ? (
                    <>
                        <h1 className="text-4">
                            Hang tight. We're getting your recipe!
                        </h1>
                    </>
                ) : (
                    <RecipePresentation recipe={recipe} />
                )}
                {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
            </article>
        </main>
    );
}

function RecipePresentation({
    recipe,
}: {
    recipe: {
        id: number;
        title: string;
        author: {
            id: number;
            username: string;
        };
        description: string;
        instructions: string[];
        ingredients: string[];
        image_url: string;
    };
}) {
    return (
        <>
            <h1 className="text-4">{recipe.title}</h1>
            <Link to="/">Home</Link>
            <p>{recipe.description}</p>
            <p>By: {recipe.author.username}</p>
            <hr />
            <ImageWrapper
                src={recipe.image_url}
                className="aspect-[1.77] object-cover"
                // width={400}
                // height={800}
                altText="generic recipe image"
            />
            <h2 className="text-2">Ingredients</h2>
            <ul className="stack [--stack-gap:var(--space-3xs)]">
                {recipe.ingredients.map((ingredient: string) => (
                    <li key={nanoid()}>{ingredient}</li>
                ))}
            </ul>
            <h2 className="text-2">Instructions</h2>
            <ol className="stack [--stack-gap:var(--space-2xs)]">
                {recipe.instructions.map((instruction: string) => (
                    <li key={nanoid()}>{instruction}</li>
                ))}
            </ol>
        </>
    );
}
