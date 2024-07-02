import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
