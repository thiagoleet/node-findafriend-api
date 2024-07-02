import { PetRepository } from "@/repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryPetRepository } from "@/repositories/in-memory";
import { RequiredFieldsError } from "@/errors";

describe("Register Pet UseCase", () => {
  let repository: PetRepository;
  let sut: RegisterPetUseCase;

  beforeEach(() => {
    repository = new InMemoryPetRepository();
    sut = new RegisterPetUseCase(repository);
  });

  it("should be able to register a pet", async () => {
    const { pet } = await sut.execute({
      name: "Pet Name",
      age: 1,
      species: "Dog",
      weight: 1,
      orgId: "org-id",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to register a pet without an org", async () => {
    await expect(() =>
      sut.execute({
        name: "Pet Name",
        age: 1,
        weight: 1,
        species: "Dog",
        orgId: "",
      })
    ).rejects.toBeInstanceOf(RequiredFieldsError);
  });

  it("should not be able to register a pet without a name", async () => {
    await expect(() =>
      sut.execute({
        name: "",
        age: 1,
        weight: 1,
        species: "Dog",
        orgId: "org-id",
      })
    ).rejects.toBeInstanceOf(RequiredFieldsError);
  });
});
