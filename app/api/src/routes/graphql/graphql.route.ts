import express from "express";
import { createSchema, createYoga } from "graphql-yoga";

let schema = createSchema({
    typeDefs: `
        type Query {
            hello: String
        }
    `,
    resolvers: {
        Query: {
            hello: () => "Hello World!",
        },
    },
});

let yoga = createYoga({ schema });

let gql_route = express.Router();

gql_route.use("/", yoga);

export { gql_route };
