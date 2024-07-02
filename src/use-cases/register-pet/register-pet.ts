import { RequiredFieldsError } from "@/errors";
import { PetRepository } from "@/repositories";
import { Pet } from "@prisma/client";

type RegisterPetUseCaseProps = {
  name: string;
  age: number;
  species: string;
  weight: number;
  orgId: string;
};

type RegisterPetUseCaseResponse = {
  pet: Pet;
};

export class RegisterPetUseCase {
  constructor(private repository: PetRepository) {}

  async execute(
    data: RegisterPetUseCaseProps
  ): Promise<RegisterPetUseCaseResponse> {
    if (!data.orgId) {
      throw new RequiredFieldsError();
    }

    if (!data.name) {
      throw new RequiredFieldsError();
    }

    const pet = await this.repository.create(data);

    return { pet };
  }
}
