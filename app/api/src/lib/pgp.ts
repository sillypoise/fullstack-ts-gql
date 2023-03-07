import { config } from "../config/config";
import pg_promise from "pg-promise";
import { logger } from "./logger";
import type { IConnectionParameters } from "pg-promise/typescript/pg-subset";

let pg_config = config.database.postgres;
logger.debug("pg_config", pg_config);

let pgp = pg_promise();
let cn: IConnectionParameters = {
    host: pg_config.host,
    port: pg_config.port,
    database: pg_config.db,
    user: pg_config.user,
    password: pg_config.password,
    max: 30,
};
let db = pgp(cn);
logger.info("Connected to Postgres database", {
    db: pg_config.db,
    user: pg_config.user,
});

export { db };
