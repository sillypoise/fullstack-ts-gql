import * as esbuild from "esbuild";

let ctx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: "dist",
    platform: "node",
    target: "node18",
});

await ctx.watch();
console.log("watching you...");
