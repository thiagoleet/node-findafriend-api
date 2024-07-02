import { PetRepository } from "@/repositories";
import { Pet } from "@prisma/client";

type RegisterPetUseCaseProps = {
  name: string;
  age: number;
  weight: number;
  species: String;
  org_id: string;
};

type RegisterPetUseCaseResponse = {
  pet: Pet;
};

export class RegisterPetUseCase {
  constructor(private repository: PetRepository) {}

  async execute(
    data: RegisterPetUseCaseProps
  ): Promise<RegisterPetUseCaseResponse> {
    throw new Error("Not implemented");
  }
}
