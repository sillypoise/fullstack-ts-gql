import { config } from "./config/config";
import { logger } from "./lib/logger";

console.log(config.stage);
console.log(process.env.NODE_ENV);

function helloWorld() {
    console.log("Hello World");
    logger.info("text info log");
}
helloWorld();
