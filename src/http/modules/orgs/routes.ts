import { FastifyInstance } from "fastify";
import { register } from "./controllers";

async function routes(app: FastifyInstance) {
  app.post("/register", register);
}

export default routes;
