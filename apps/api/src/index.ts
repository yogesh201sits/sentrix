import { createApp } from "./app";
import { loadEnv } from "./env";

const env = loadEnv();
const app = createApp();

console.log(
  `Sentrix API listening on http://localhost:${env.PORT}`,
);

export default {
  port: env.PORT,
  fetch: app.fetch,
};