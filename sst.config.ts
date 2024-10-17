/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "trip-manager",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Remix("MyWeb", {
      domain: $app.stage === "production" ? "ourtrip.info" : undefined,
    });
  },
});
