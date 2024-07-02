import { FastifyRequest, FastifyReply } from "fastify";
import { createToken } from "../utils";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role, sub } = request.user;

  const token = await createToken(reply, { id: sub, role });
  const refreshToken = await createToken(reply, { id: sub, role }, true);

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ message: "Token refreshed", token });
}
