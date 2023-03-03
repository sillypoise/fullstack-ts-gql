import type { Request, Response } from "express";
import express from "express";

let api = express.Router();

// api.use("/gql")
//
api.use("/health", (_req: Request, res: Response) => {
    return res.status(204).send("OK");
});

export { api };
