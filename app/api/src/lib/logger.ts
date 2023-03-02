import type { Logger } from "winston";
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

let winston_log_format = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

let logger: Logger;

function dev_logger(): Logger {
    return createLogger({
        level: "info",
        format: combine(
            colorize(),
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
        level: "info",
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: "user-service" },
        transports: [new transports.Console()],
    });
}

if (config.stage !== "production") {
    logger = dev_logger();
} else {
    logger = prod_logger();
}

export { logger };
