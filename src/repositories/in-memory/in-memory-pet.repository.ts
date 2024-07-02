import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../interfaces/pet.repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetRepository implements PetRepository {
  private items: Pet[];

  constructor() {
    this.items = [];
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      weight: data.weight,
      created_at: new Date(),
      updated_at: new Date(),
    } as unknown as Pet;

    this.items.push(pet);

    return pet;
  }
}
