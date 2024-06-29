import { Org, Prisma } from "@prisma/client";
import { OrgRepository } from "../interfaces/org.repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgRepository implements OrgRepository {
  private items: Org[];

  constructor() {
    this.items = [];
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    } as Org;

    this.items.push(org);

    return org;
  }
}
