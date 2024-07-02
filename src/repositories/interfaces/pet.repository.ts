import { Pet, Prisma } from "@prisma/client";

export type FilterPetsParams = {
  city: string;
  age?: number | null;
  weight?: number | null;
  species?: string | null;
  orgId?: string | null;
};

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  filter(data: FilterPetsParams): Promise<Pet[]>;
}
