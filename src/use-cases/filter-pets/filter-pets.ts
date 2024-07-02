import { RequiredFieldsError } from "@/errors";
import { FilterPetsParams, PetRepository } from "@/repositories";
import { Pet } from "@prisma/client";

type FilterPetsUseCaseProps = {
  params: FilterPetsParams;
};

type FilterPetsUseCaseResponse = {
  pets: Pet[];
};

export class FilterPetsUseCase {
  constructor(private repository: PetRepository) {}

  async execute(
    data: FilterPetsUseCaseProps
  ): Promise<FilterPetsUseCaseResponse> {
    const { params } = data;

    if (!params.city) {
      throw new RequiredFieldsError();
    }

    const pets = await this.repository.filter(params);

    return { pets };
  }
}
