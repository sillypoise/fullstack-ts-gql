import { z } from "zod";
import { logger } from "../lib/logger";
import type { UserModule } from "./generated-types/module-types";

async function user(_parent: any, args: { id: string }, ctx, info) {
    let id = z.string().parse(args.id);
    let user = {
        id: id,
        full_name: "John Doe",
        is_admin: false,
    };
    return user;
}

let user_resolver: UserModule.Resolvers = {
    Query: {
        user,
    },
};

export { user_resolver };
