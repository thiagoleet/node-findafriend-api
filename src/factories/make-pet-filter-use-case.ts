import { PrismaPetRepository } from "@/repositories/prisma";
import { FilterPetsUseCase } from "@/use-cases/filter-pets";

export function makePetFilterUseCase() {
  const repository = new PrismaPetRepository();
  const useCase = new FilterPetsUseCase(repository);

  return useCase;
}
