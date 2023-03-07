/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    test: {
        alias: {
            "~": path.resolve(__dirname, "./app"),
        },
        reporters: ["verbose"],
    },
});
