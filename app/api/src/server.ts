import dotenv from "dotenv";
import type { Server } from "http";
import { createServer as create_http_server } from "http";
import { app } from "./app";
import { config } from "./config/config";
import { logger } from "./lib/logger";

dotenv.config();

let PORT = config.server.port;

let server = create_http_server(app);

async function start_server(): Promise<Server | void> {
    server.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
}

start_server().catch((err) => {
    logger.error(err);
    process.exit(1);
});
