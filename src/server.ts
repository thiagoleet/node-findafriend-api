import { app } from "./app";
import { env } from "./env";

const APP_HOST = "0.0.0.0";
const APP_PORT = env.PORT || 3333;

app
  .listen({
    host: APP_HOST,
    port: APP_PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server running in ${APP_HOST}:${APP_PORT}`);
  });
