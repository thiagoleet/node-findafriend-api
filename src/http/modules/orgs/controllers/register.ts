import { OrgAlreadyExistsError } from "@/errors";
import { makeRegisterUseCase } from "@/factories/make-org-register-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
  });

  const { name, email, password, address, city, phone } =
    registerBodySchema.parse(request.body);

  try {
    const useCase = makeRegisterUseCase();

    const { org } = await useCase.execute({
      name,
      email,
      password,
      address,
      city,
      phone,
    });

    return reply
      .status(201)
      .send({ message: "Org created!", org: { id: org.id, name: org.name } });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
