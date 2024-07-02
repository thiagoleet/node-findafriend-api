import { PrismaPetRepository } from "@/repositories/prisma";
import { RegisterPetUseCase } from "@/use-cases/register-pet";

export function makeRegisterPetUseCase() {
  const repository = new PrismaPetRepository();
  const useCase = new RegisterPetUseCase(repository);
  return useCase;
}
