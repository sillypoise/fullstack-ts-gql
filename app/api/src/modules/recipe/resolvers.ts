import { z } from "zod";
import { logger } from "../../lib/logger";
import type { RecipeModule } from "./generated-types/module-types";

async function recipe(
    _parent: any,
    args: { id: string },
    _ctx: any,
    _info: any
): Promise<RecipeModule.Recipe | void> {
    let id = z.string().parse(args.id);
    let recipe: RecipeModule.Recipe = {
        id: id,
        title: "Banana Pancakes",
        description: "A delicious breakfast recipe",
        instructions: [
            "Mash the bananas",
            "Mix the bananas with the eggs",
            "Cook the pancakes",
        ],

        ingredients: [
            "2 bananas",
            "2 eggs",
            "1 cup of flour",
            "1/2 cup of milk",
            "1/2 cup of water",
            "1/2 teaspoon of baking soda",
            "1/2 teaspoon of baking powder",
            "1/2 teaspoon of salt",
            "1 teaspoon of vanilla extract",
            "1 tablespoon of sugar",
            "1 tablespoon of butter",
        ],
        image_url: "https://example.com/image.png",
        author: {
            id: "1",
            username: "mr.example",
        },
        created_at: new Date(),
        updated_at: new Date(),
    };
    return recipe;
}

async function recipes(
    _parent: any,
    _args: any,
    _ctx: any,
    _info: any
): Promise<Array<RecipeModule.Recipe> | void> {
    return [];
}

let recipe_resolver: RecipeModule.Resolvers = {
    Query: {
        recipe,
        recipes,
    },
};

export { recipe_resolver };
