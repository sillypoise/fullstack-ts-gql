import { db } from "../../lib/pgp";

function getRecipeById(id: string) {
    return db.oneOrNone("SELECT * FROM public.recipe WHERE id = $1", [id]);
}

export { getRecipeById };
