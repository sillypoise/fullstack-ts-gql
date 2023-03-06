import path from "path";
import express from "express";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { ping_resolver } from "../../modules/health/resolvers";
import { user_resolver } from "../../modules/user/resolvers";
import { recipe_resolver } from "../../modules/recipe/resolvers";

let types_array = loadFilesSync(
    path.join(__dirname, "../src/modules/**/typedefs/*.graphql")
);

let typeDefs = mergeTypeDefs(types_array, DateTimeTypeDefinition);
let resolvers = mergeResolvers([
    ping_resolver,
    user_resolver,
    recipe_resolver,
    { DateTime: DateTimeResolver },
]);

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

let yoga = createYoga({ schema });

let gql_route = express.Router();

gql_route.use("/", yoga);

export { gql_route };
