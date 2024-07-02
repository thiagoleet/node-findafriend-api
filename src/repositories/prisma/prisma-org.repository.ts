import { Org, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OrgRepository } from "../interfaces/org.repository";

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const createdOrg = await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        address: data.address,
        city: data.city,
        phone: data.phone,
      },
    });

    return createdOrg;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } });

    return org || null;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { id } });

    return org || null;
  }
}
