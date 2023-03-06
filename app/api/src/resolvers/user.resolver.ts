import { z } from "zod";
import { logger } from "../lib/logger";

async function user(_parent: any, args: { id: string }, ctx, info) {
    let id = z.string().parse(args.id);
    let user = {
        id: id,
        full_name: "John Doe",
        is_admin: false,
    };
    return user;
}

let user_resolver = {
    Query: {
        user,
    },
};

export { user_resolver };
