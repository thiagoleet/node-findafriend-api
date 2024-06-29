import { OrgRepository } from "@/repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryOrgRepository } from "@/repositories/in-memory";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError, RequiredFieldsError } from "@/errors";

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

  it("should not be able to register with the same email", async () => {
    const data = {
      name: "Org Name",
      email: "org@example.com",
      password: "password",
      address: "Org Address",
      phone: "1234567890",
    };

    await sut.execute(data);

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });

  it("should not be able to register without an address", async () => {
    const data = {
      name: "Org Name",
      email: "org@example.com",
      address: "",
      password: "password",
      phone: "1234567890",
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      RequiredFieldsError
    );
  });

  it("should not be able to register without a phone number", async () => {
    const data = {
      name: "Org Name",
      email: "org@example.com",
      address: "Org Address",
      password: "password",
      phone: "",
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      RequiredFieldsError
    );
  });
});
