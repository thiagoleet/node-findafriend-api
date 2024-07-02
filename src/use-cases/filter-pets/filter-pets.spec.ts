import { PetRepository } from "@/repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { FilterPetsUseCase } from "./filter-pets";
import { InMemoryPetRepository } from "@/repositories/in-memory";
import { RequiredFieldsError } from "@/errors";

describe("Filter Pets UseCase", () => {
  let repository: PetRepository;
  let sut: FilterPetsUseCase;

  beforeEach(async () => {
    repository = new InMemoryPetRepository();
    sut = new FilterPetsUseCase(repository);

    await repository.create({
      name: "Pet Name",
      age: 1,
      species: "Dog",
      weight: 1,
      orgId: "org-id",
      city: "Pet City",
    });

    await repository.create({
      name: "Other Pet Name",
      age: 2,
      species: "Dog",
      weight: 1,
      orgId: "org-id",
      city: "Pet City",
    });

    await repository.create({
      name: "The Only Cat We Have",
      age: 2,
      species: "Cat",
      weight: 1,
      orgId: "org-id",
      city: "Pet Town",
    });
  });

  it("should be able to filter pets by city", async () => {
    const { pets } = await sut.execute({ params: { city: "Pet City" } });

    expect(pets).toHaveLength(2);
  });

  it("should not be able to filter pets without city parameter", async () => {
    await expect(() =>
      sut.execute({ params: { city: "" } })
    ).rejects.toBeInstanceOf(RequiredFieldsError);
  });

  it("should be able to filter pets by age/city", async () => {
    const { pets } = await sut.execute({
      params: { city: "Pet City", age: 1 },
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to filter pets by weight/city", async () => {
    const { pets } = await sut.execute({
      params: { city: "Pet City", weight: 1 },
    });

    expect(pets).toHaveLength(2);
  });

  it("should be able to filter pets by orgId/city", async () => {
    const { pets } = await sut.execute({
      params: { city: "Pet City", orgId: "org-id" },
    });

    expect(pets).toHaveLength(2);
  });

  it("should be able to filter pets by species/city", async () => {
    const { pets } = await sut.execute({
      params: { city: "Pet Town", species: "Cat" },
    });

    expect(pets).toHaveLength(1);
  });
});
