import { OrgRepository } from "@/repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { FindOrgByIdUseCase } from "./find-org-by-id";
import { InMemoryOrgRepository } from "@/repositories/in-memory";
import { ResourceNotFoundError } from "@/errors";

describe("Find Org By Id UseCase", () => {
  let repository: OrgRepository;
  let sut: FindOrgByIdUseCase;

  beforeEach(() => {
    repository = new InMemoryOrgRepository();
    sut = new FindOrgByIdUseCase(repository);
  });

  it("should be able to find a org by id", async () => {
    const data = {
      name: "Org Name",
      email: "org@example.com",
      password_hash: "password",
      address: "Org Address",
      city: "Org City",
      phone: "1234567890",
    };

    const { id } = await repository.create(data);

    const { org } = await sut.execute({ id });

    expect(org.id).toEqual(id);
  });

  it("should not be able to find a org by id", async () => {
    await expect(() =>
      sut.execute({ id: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
