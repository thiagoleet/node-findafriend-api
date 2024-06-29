import { Prisma, Org } from "@prisma/client";
export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
