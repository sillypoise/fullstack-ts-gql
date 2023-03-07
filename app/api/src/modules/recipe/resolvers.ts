import { z } from "zod";
import { logger } from "../../lib/logger";
import type { Recipe, Resolvers } from "../../types/types";
import { user_resolver } from "../user/resolvers";
import { getRecipeById } from "./model";

async function recipe(
    parent: any,
    args: { id: string },
    ctx: any,
    info: any
): Promise<Recipe | void> {
    let id = z.string().parse(args.id);
    try {
        let recipe = await getRecipeById(id);
        recipe.author = await user_resolver.Query.user(
            null,
            { id: recipe.author_id.toString() },
            ctx,
            info
        );
        console.log(recipe);
        return recipe;
    } catch (error) {
        logger.error("%o", error);
    }
}

async function recipes(
    _parent: any,
    _args: any,
    _ctx: any,
    _info: any
): Promise<Array<Recipe> | void> {
    return [];
}

let recipe_resolver = {
    Query: {
        recipe,
        recipes,
    },
};

export { recipe_resolver };
