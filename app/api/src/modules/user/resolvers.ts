import { z } from "zod";
import { logger } from "../../lib/logger";
import type { User, Resolvers } from "../../types/types";
import { getUserById } from "./model";

async function user(
    parent: any,
    args: { id: string },
    _ctx: any,
    _info: any
): Promise<User | void> {
    let id = z.string().parse(args.id);
    try {
        let user = await getUserById(id);
        logger.debug("%o", parent);
        return user;
    } catch (error) {
        logger.error("%o", error);
    }
}

async function users(
    _parent: any,
    _args: any,
    _ctx: any,
    _info: any
): Promise<User[]> {
    return [];
}

let user_resolver = {
    Query: {
        user,
    },
};

export { user_resolver };
