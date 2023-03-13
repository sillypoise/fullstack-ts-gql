import type { Logger } from "winston";
import { addColors } from "winston";
import { createLogger, transports, format } from "winston";
import { config } from "../config/config";

let {
    combine,
    timestamp,
    printf,
    label,
    colorize,
    errors,
    splat,
    json,
    prettyPrint,
} = format;

let levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
};

let colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "cyan",
    debug: "white",
};

function level() {
    let isDev = config.stage !== "production";
    return isDev ? "debug" : "warn";
}

let winston_log_format = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

let logger: Logger;

addColors(colors);

function dev_logger(): Logger {
    return createLogger({
        level: level(),
        levels,
        format: combine(
            colorize({ all: true }),
            timestamp({ format: `YYYY-MM-DD HH:mm:ss` }),
            errors({ stack: true }),
            label({ label: "dev" }),
            splat(),
            prettyPrint(),
            winston_log_format
        ),
        transports: [new transports.Console()],
    });
}

function prod_logger(): Logger {
    return createLogger({
        level: level(),
        format: combine(timestamp(), errors({ stack: true }), json()),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: "logs/errors.log",
            }),
        ],
    });
}

if (config.stage !== "production") {
    logger = dev_logger();
} else {
    logger = prod_logger();
}

export { logger };
