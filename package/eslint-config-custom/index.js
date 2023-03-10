module.exports = {
    extends: [
        "@remix-run/eslint-config",
        "@remix-run/eslint-config/node",
        "turbo",
        "prettier",
    ],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve("next/babel")],
        },
    },
};
