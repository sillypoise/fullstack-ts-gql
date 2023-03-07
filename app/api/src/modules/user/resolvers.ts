import { z } from "zod";
import type { User, Resolvers } from "../../types/types";

async function user(
    _parent: any,
    args: { id: string },
    _ctx: any,
    _info: any
): Promise<User | void> {
    let id = z.string().parse(args.id);
    let user: User = {
        id: id,
        username: "mr.example",
    };
    return user;
}

async function users(
    _parent: any,
    _args: any,
    _ctx: any,
    _info: any
): Promise<User[]> {
    return [];
}

let user_resolver: Resolvers = {
    Query: {
        user,
    },
};

export { user_resolver };
