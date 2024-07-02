import { makeAuthenticateUseCase } from "@/factories/make-org-authenticate-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { createToken } from "../utils";
import { InvalidCredentialsError } from "@/errors";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const useCase = makeAuthenticateUseCase();

    const { org } = await useCase.execute({ email, password });

    const token = await createToken(reply, { id: org.id, role: "ADMIN" });
    const refreshToken = await createToken(
      reply,
      { id: org.id, role: "ADMIN" },
      true
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ message: "ORG authenticated", token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
