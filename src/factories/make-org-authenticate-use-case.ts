import { PrismaOrgRepository } from "@/repositories/prisma";
import { AuthenticateUseCase } from "@/use-cases/authenticate";

export function makeAuthenticateUseCase() {
  const repository = new PrismaOrgRepository();
  const useCase = new AuthenticateUseCase(repository);

  return useCase;
}
