import { OrgRepository } from "@/repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryOrgRepository } from "@/repositories/in-memory";
import { compare } from "bcryptjs";

describe("Register UseCase", () => {
  let repository: OrgRepository;
  let sut: RegisterUseCase;

  beforeEach(() => {
    repository = new InMemoryOrgRepository();
    sut = new RegisterUseCase(repository);
  });

  it("should be able to register", async () => {
    const data = {
      name: "Org Name",
      email: "org@example.com",
      password: "password",
      address: "Org Address",
      phone: "1234567890",
    };

    const { org } = await sut.execute(data);
    const isPasswordHashed = await compare(data.password, org.password_hash);

    expect(org.id).toEqual(expect.any(String));
    expect(isPasswordHashed).toBeTruthy();
  });
});
