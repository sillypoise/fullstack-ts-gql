import { z } from "zod";
import { logger } from "../../lib/logger";
import type {
    QueryRecipeArgs,
    QueryRecipesArgs,
    Recipe,
} from "../../types/types";
import { user_resolver } from "../user/resolvers";
import { getRecipeById, getRecipes } from "./model";

async function recipe(
    _parent: any,
    args: QueryRecipeArgs,
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
    args: QueryRecipesArgs,
    _ctx: any,
    _info: any
): Promise<Array<Recipe> | void> {
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
            limit = 5;
        }
        if (!args.offset) {
            offset = 0;
        }
        limit = z.number().parse(limit);
        offset = z.number().parse(offset);
        let recipes = await getRecipes({ limit, offset });
        let authors = await Promise.all(
            recipes.map((recipe) =>
                user_resolver.Query.user(
                    null,
                    { id: recipe.author_id.toString() },
                    _ctx,
                    _info
                )
            )
        );
        recipes.forEach((recipe, index) => {
            recipe.author = authors[index];
            return recipe;
        });

        logger.debug("%o", recipes);
        return recipes;
    } catch (error) {
        logger.error("%o", error);
    }
}

let recipe_resolver = {
    Query: {
        recipe,
        recipes,
    },
};

export { recipe_resolver };
