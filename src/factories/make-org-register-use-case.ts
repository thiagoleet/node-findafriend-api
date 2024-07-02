import { PrismaOrgRepository } from "@/repositories/prisma";
import { RegisterUseCase } from "@/use-cases/register";

export function makeRegisterUseCase() {
  const repository = new PrismaOrgRepository();
  const useCase = new RegisterUseCase(repository);

  return useCase;
}
