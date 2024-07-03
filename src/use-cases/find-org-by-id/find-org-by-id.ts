import { ResourceNotFoundError } from "@/errors";
import { OrgRepository } from "@/repositories";
import { Org } from "@prisma/client";

type FindOrgByIdUseCaseProps = {
  id: string;
};

type FindOrgByIdUseCaseResponse = {
  org: Org;
};

export class FindOrgByIdUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: FindOrgByIdUseCaseProps
  ): Promise<FindOrgByIdUseCaseResponse> {
    const org = await this.orgRepository.findById(data.id);

    if (!org) {
      throw new ResourceNotFoundError("Org not found");
    }

    return { org };
  }
}
