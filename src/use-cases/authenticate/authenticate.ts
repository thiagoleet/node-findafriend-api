import { InvalidCredentialsError } from "@/errors";
import { OrgRepository } from "@/repositories";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

type AuthenticateProps = {
  email: string;
  password: string;
};

type AuthenticateResponse = {
  org: Org;
};

export class AuthenticateUseCase {
  constructor(private repository: OrgRepository) {}

  async execute(data: AuthenticateProps): Promise<AuthenticateResponse> {
    const org = await this.repository.findByEmail(data.email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(data.password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
