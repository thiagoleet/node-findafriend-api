import { OrgRepository } from "@/repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryOrgRepository } from "@/repositories/in-memory";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors";

describe("Authenticate UseCase", () => {
  let repository: OrgRepository;
  let sut: AuthenticateUseCase;

  beforeEach(async () => {
    repository = new InMemoryOrgRepository();
    sut = new AuthenticateUseCase(repository);

    // Creating a new org
    const password_hash = await hash("password", 6);

    await repository.create({
      name: "Org Name",
      email: "org@example.com",
      password_hash,
      address: "Org Address",
      phone: "1234567890",
    });
  });

  it("should be able to authenticate", async () => {
    const data = {
      email: "org@example.com",
      password: "password",
    };

    const { org } = await sut.execute(data);

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with WRONG EMAIL", async () => {
    const data = {
      email: "not-my-email@example.com",
      password: "password",
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it("should not be able to authenticate with WRONG PASSWORD", async () => {
    const data = {
      email: "org@example.com",
      password: "wrong-password",
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });
});
