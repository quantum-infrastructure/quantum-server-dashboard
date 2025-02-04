const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            microApp: "microApp@http://localhost:3000/remoteEntry.js",
          },
          shared: { react: { singleton: true }, "react-dom": { singleton: true } },
        })
      );
      return config;
    },
  },
};
