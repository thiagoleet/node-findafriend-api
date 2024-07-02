import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(request: FastifyRequest, repy: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    repy.status(401).send({ message: "Unauthorized" });
  }
}
