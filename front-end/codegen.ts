module.exports = {
  overwrite: true,
  schema: process.env.REACT_APP_GRAPH_URL,
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/graphql/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};