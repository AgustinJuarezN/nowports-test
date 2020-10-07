const dev = {
  app: {
    DOMAIN: "http://localhost:3000",
    SERVER: "http://localhost:3015",
  },
};

const prod = {
  app: {
    DOMAIN: "http://localhost:3000",
    SERVER: "http://localhost:3015",
  },
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config,
};
