import { OrgRepository } from "@/repositories";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

type RegisterUseCaseProps = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
};

type RegisterUseCaseResponse = {
  org: Org;
};

const SALT_ROUNDS = 6;

export class RegisterUseCase {
  constructor(private repository: OrgRepository) {}

  async execute(data: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    // TODO: Validate email as unique

    const password_hash = await hash(data.password, SALT_ROUNDS);

    const org = await this.repository.create({
      name: data.name,
      email: data.email,
      password_hash,
      address: data.address,
      phone: data.phone,
    });

    return { org };
  }
}
