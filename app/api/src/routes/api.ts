import type { Request, Response } from "express";
import express from "express";
import { logger } from "../lib/logger";
import { getRecipeById } from "../modules/recipe/model";
import { gql_route } from "./graphql/graphql.route";

let api = express.Router();

// api.use("/gql")

api.use("/health", (_req: Request, res: Response) => {
    return res.status(204).send("OK");
});

api.use("/graphql", gql_route);

export { api };
