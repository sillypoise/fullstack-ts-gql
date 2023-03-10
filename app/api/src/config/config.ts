import { z } from "zod";
import dotenv from "dotenv";
import { logger } from "../lib/logger";

dotenv.config();

const stages = ["production", "development"] as const;

type Stage = (typeof stages)[number];

function getStage(stages: Stage[]) {
    if (!stages.length) return "production";

    for (const stage of stages) {
        // if any of the provided stages is production, assume we are in production
        if (stage === "production") {
            return stage;
        }
    }

    return stages[0];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

function isStage(potentialStage: string): potentialStage is Stage {
    return stages.includes(potentialStage as Stage);
}

const stage = getStage(
    [process.env.NODE_ENV, process.env.APP_ENV].filter(notEmpty).filter(isStage)
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function envToBool(value: string | undefined) {
    if (!value) {
        return false;
    }

    return ["true", "TRUE", "1"].includes(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function envToStr(value: string | undefined, defaultValue = "") {
    return value === undefined ? defaultValue : value;
}

function envToNumber(value: string | undefined, defaultValue: number): number {
    const numValue =
        value === undefined || value === "" ? defaultValue : Number(value);

    return isNaN(numValue) ? defaultValue : numValue;
}

let configSchema = z.object({
    stage: z.enum(stages),
    server: z.object({
        port: z.number(),
        // baseURL: z.string(),
    }),
    // ci: z{},
    // api: z{},
    database: z.object({
        postgres: z.object({
            user: z.string(),
            password: z.string(),
            db: z.string(),
            host: z.string(),
            uri: z.string(),
            port: z.number(),
            // shouldMigrate: Boolean
        }),
    }),
    // services: z.object({
    // }),
    // sentry,
    // git: z.object({
    //     commit: z.string().optional(),
    // }),
});

export let config = configSchema.parse({
    stage,
    server: {
        port: envToNumber(process.env.PORT, 8000),
        // baseURL: envToStr(process.env.BASE_URL, "http://localhost:8000"),
    },
    database: {
        postgres: {
            user: envToStr(process.env.POSTGRES_USER),
            password: envToStr(process.env.POSTGRES_PASSWORD),
            db: envToStr(process.env.POSTGRES_DB),
            host: envToStr(process.env.POSTGRES_HOST),
            uri: envToStr(process.env.POSTGRES_URI),
            port: envToNumber(process.env.POSTGRES_PORT, 5432),
            // shouldMigrate: envToBool(process.env.SHOULD_MIGRATE),
        },
    },
    // services: {
    // },
});
