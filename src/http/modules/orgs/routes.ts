import { FastifyInstance } from "fastify";
import { authenticate, register } from "./controllers";

async function routes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/authenticate", authenticate);
}

export default routes;
