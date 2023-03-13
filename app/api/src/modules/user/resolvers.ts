import { z } from "zod";
import { logger } from "../../lib/logger";
import type { User, QueryRecipesArgs } from "../../types/types";
import { getRecipes } from "../recipe/model";
import { getAllUsers, getUserById } from "./model";

async function user(
    _parent: any,
    args: { id: string },
    _ctx: any,
    _info: any
): Promise<User | void> {
    let id = z.string().parse(args.id);
    try {
        let user = await getUserById(id);
        let recipes = await getRecipes({ limit: 100 });
        user.recipes = recipes.filter((recipe) => recipe.author_id === user.id);
        return user;
    } catch (error) {
        logger.error("%o", error);
    }
}

async function users(
    _parent: any,
    args: any,
    _ctx: any,
    _info: any
): Promise<User[] | void> {
    try {
        let limit: QueryRecipesArgs["limit"];
        let offset: QueryRecipesArgs["offset"];
        if (args.limit) {
            limit = z.number().min(1).max(100).parse(args.limit);
        }
        if (args.offset) {
            offset = z.number().min(0).parse(args.offset);
        }
        if (!args.limit) {
            limit = 100;
        }
        if (!args.offset) {
            offset = 0;
        }
        limit = z.number().parse(limit);
        offset = z.number().parse(offset);
        let users = await getAllUsers({ limit, offset });
        let recipes = await getRecipes({ limit: 100 });
        users.forEach(
            (user) =>
                (user.recipes = recipes.filter(
                    (recipe) => recipe.author_id === user.id
                ))
        );
        return users;
    } catch (error) {
        logger.error("%o", error);
    }
}

let user_resolver = {
    Query: {
        user,
        users,
    },
};

export { user_resolver };
