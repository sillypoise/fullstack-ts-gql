import { db } from "../../lib/pgp";

function getUserById(id: string) {
    return db.oneOrNone("SELECT * FROM public.user WHERE id = $1", [id]);
}

function getAllUsers({
    limit = 5,
    offset = 0,
}: {
    limit?: number;
    offset?: number;
}) {
    return db.any("SELECT * FROM public.user LIMIT $1 OFFSET $2", [
        limit,
        offset,
    ]);
}

export { getUserById, getAllUsers };
