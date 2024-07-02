import { Pet, Prisma } from "@prisma/client";
import { FilterPetsParams, PetRepository } from "../interfaces/pet.repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetRepository implements PetRepository {
  private items: Pet[];

  constructor() {
    this.items = [];
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    } as Pet;

    this.items.push(pet);

    return pet;
  }

  async filter(data: FilterPetsParams): Promise<Pet[]> {
    return this.items.filter((item) => {
      let matches = true;

      if (data.city) {
        matches = matches && item.city === data.city;
      }

      if (data.age) {
        matches = matches && item.age === data.age;
      }

      if (data.species) {
        matches = matches && item.species === data.species;
      }

      if (data.weight) {
        matches = matches && item.weight === data.weight;
      }

      if (data.orgId) {
        matches = matches && item.orgId === data.orgId;
      }

      return matches;
    });
  }
}
