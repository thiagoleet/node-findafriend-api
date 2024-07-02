import { Pet, Prisma } from "@prisma/client";
import { FilterPetsParams, PetRepository } from "../interfaces/pet.repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async filter(data: FilterPetsParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        city: data.city,
        age: data.age || undefined,
        weight: data.weight || undefined,
        species: data.species || undefined,
        orgId: data.orgId || undefined,
      },
    });

    return pets;
  }
}
