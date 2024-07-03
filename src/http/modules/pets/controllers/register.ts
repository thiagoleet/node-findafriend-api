import { makeRegisterPetUseCase } from "@/factories/make-pet-register.use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    age: z.number().positive(),
    species: z.string(),
    weight: z.number().positive(),
    city: z.string(),
  });

  const inputPet = registerPetBodySchema.parse(request.body);

  const orgId = request.user.sub;

  try {
    const useCase = makeRegisterPetUseCase();

    const { pet } = await useCase.execute({
      ...inputPet,
      orgId,
    });

    return reply.status(201).send({ message: "Pet created!", pet });
  } catch (err) {
    throw err;
  }
}
