import { db } from "../../lib/pgp";
import type { MutationAddRecipeArgs } from "../../types/types";

function getRecipeById(id: string) {
    return db.oneOrNone("SELECT * FROM public.recipe WHERE id = $1", [id]);
}

function getRecipes({
    limit = 5,
    offset = 0,
}: {
    limit?: number;
    offset?: number;
}) {
    return db.any("SELECT * FROM public.recipe LIMIT $1 OFFSET $2", [
        limit,
        offset,
    ]);
}

function createRecipe({
    title,
    description,
    instructions,
    ingredients,
    author,
    image_url,
}: MutationAddRecipeArgs) {
    return db.one(
        `INSERT INTO public.recipe (
            title, 
            description, 
            instructions, 
            ingredients, 
            author_id, 
            image_url 
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        ) RETURNING *`,
        [title, description, instructions, ingredients, author, image_url]
    );
}

function getRecipesByUserId(id: string) {
    return db.oneOrNone(
        "SELECT title, description, instructions, ingredients, author_id, image_url FROM public.recipe WHERE author_id = $1",
        [id]
    );
}

export { getRecipeById, getRecipes, createRecipe, getRecipesByUserId };
