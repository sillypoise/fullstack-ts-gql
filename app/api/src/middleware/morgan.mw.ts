import type { StreamOptions } from "morgan";
import morgan from "morgan";
import { config } from "../config/config";
import { logger } from "../lib/logger";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
let stream: StreamOptions = {
    write: (message) => logger.http(message),
};

function skip() {
    return config.stage !== "development";
}

let mw_morgan = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

export { mw_morgan };
