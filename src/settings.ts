export const SHOULD_GENERATE_SOURCEMAP = /^true$/i.test(
    process.env.GENERATE_SOURCEMAP ?? "",
);