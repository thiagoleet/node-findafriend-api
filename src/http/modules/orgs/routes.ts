import { FastifyInstance } from "fastify";
import { authenticate, refresh, register } from "./controllers";

async function routes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/authenticate", authenticate);
  app.patch("/refresh", refresh);
}

export default routes;
