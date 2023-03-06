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
        email: "user@example.com",
        password: "password",
        username: "mr.example",
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
    };
    return user;
}

let user_resolver = {
    Query: {
        user,
    },
};

export { user_resolver };
