/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        alias: {
            "~": path.resolve(__dirname, "./app"),
        },
        reporters: ["verbose"],
    },
});
