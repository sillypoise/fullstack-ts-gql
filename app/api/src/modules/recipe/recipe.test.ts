import { suite, test, expect, beforeAll } from "vitest";
import { logger } from "../../lib/logger";
import { db } from "../../lib/pgp";
import { getRecipeById } from "./model";

suite("Model Tests", () => {
    test("get recipe by id", async () => {
        let recipe = await getRecipeById("1");

        console.log(recipe);
    });
});
