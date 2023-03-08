import { db } from "../../lib/pgp";

function getRecipeById(id: string) {
    return db.oneOrNone("SELECT * FROM public.recipe WHERE id = $1", [id]);
}

function getRecipes({
    limit = 5,
    offset = 0,
}: {
    limit: number;
    offset: number;
}) {
    return db.any("SELECT * FROM public.recipe LIMIT $1 OFFSET $2", [
        limit,
        offset,
    ]);
}

export { getRecipeById, getRecipes };
