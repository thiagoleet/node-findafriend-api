import { makePetFilterUseCase } from "@/factories/make-pet-filter-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    city: z.string(),
    age: z.coerce.number().int().optional(),
    weight: z.coerce.number().optional(),
    species: z.string().optional(),
    orgId: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
  });

  const { city, age, weight, species, orgId, page } =
    filterPetsQuerySchema.parse(request.query);

  try {
    const useCase = makePetFilterUseCase();

    const { pets } = await useCase.execute({
      params: {
        city,
        age,
        weight,
        species,
        orgId,
      },
    });

    return reply.status(200).send({ pets, page, total: pets.length });
  } catch (err) {
    throw err;
  }
}
