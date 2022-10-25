export const Config = {
  app: {
    name: "TD Admin",
  },
  s3_bucket_url: {
    local: "https://test-prod-transitiondiscoveries.s3.amazonaws.com/",
    dev: "https://test-prod-transitiondiscoveries.s3.amazonaws.com/",
    prod: "https://s3.amazonaws.com/resources.transitiondiscoveries.org/",
  },
  server: {
    local: "http://localhost:3001/api",
    dev: "http://dev.cms.transitiondiscoveries.org/api",
    prod: "https://cms.transitiondiscoveries.org/api",
  },
  api() {
    switch (window.location.hostname) {
      case "cms.transitiondiscoveries.org":
        return this.server.prod;
        break;
      case "dev.cms.transitiondiscoveries.org":
        return this.server.dev;
        break;
      default:
        return this.server.local;
        break;
    }
  },

  s3_url() {
    switch (window.location.hostname) {
      case "cms.transitiondiscoveries.org":
        return this.s3_bucket_url.prod;
        break;
      case "dev.cms.transitiondiscoveries.org":
        return this.s3_bucket_url.dev;
        break;
      default:
        return this.s3_bucket_url.local;
        break;
    }
  },
};

export * from "./menu";
export * from "./routes";
