import { OrgAlreadyExistsError, RequiredFieldsError } from "@/errors";
import { OrgRepository } from "@/repositories";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

type RegisterUseCaseProps = {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  phone: string;
};

type RegisterUseCaseResponse = {
  org: Org;
};

const SALT_ROUNDS = 6;

export class RegisterUseCase {
  constructor(private repository: OrgRepository) {}

  async execute(data: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const hasSameEmail = await this.repository.findByEmail(data.email);

    if (hasSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    if (!data.address || !data.city || !data.phone) {
      throw new RequiredFieldsError();
    }

    const password_hash = await hash(data.password, SALT_ROUNDS);

    const org = await this.repository.create({
      ...data,
      password_hash,
    });

    return { org };
  }
}
