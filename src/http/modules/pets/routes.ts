import { FastifyInstance } from "fastify";
import { filter, register } from "./controllers";
import { verifyJwt } from "@/http/hooks";

async function routes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      onRequest: [verifyJwt],
    },
    register
  );

  app.get("/filter", filter);
}

export default routes;
