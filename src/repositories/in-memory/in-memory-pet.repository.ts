import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../interfaces/pet.repository";
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
}
