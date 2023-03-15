import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { mw_morgan } from "./middleware/morgan.mw";
import { api } from "./routes/api";
import { logger } from "./lib/logger";
import path from "path";

let app = express();

app.use(mw_morgan);
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server public content
let publicPath = path.join(__dirname, "./client");
logger.debug(`Public path: ${publicPath}`);
app.use(express.static(publicPath));

app.get("/health", (_req: Request, res: Response) => {
    return res.status(204).send("OK");
});

app.use("/v1", api);

app.get("*", (_req: Request, res: Response) => {
    return res.status(404).send("404 - Not Found");
});

export { app };
