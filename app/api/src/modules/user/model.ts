import { db } from "../../lib/pgp";

function getUserById(id: string) {
    return db.oneOrNone("SELECT * FROM public.user WHERE id = $1", [id]);
}

export { getUserById };
