import { z } from "zod";
import type { UserModule } from "./generated-types/module-types";

async function user(
    _parent: any,
    args: { id: string },
    _ctx: any,
    _info: any
): Promise<UserModule.User | void> {
    let id = z.string().parse(args.id);
    let user: UserModule.User = {
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
): Promise<UserModule.User[]> {
    return [];
}

let user_resolver = {
    Query: {
        user,
    },
};

export { user_resolver };
