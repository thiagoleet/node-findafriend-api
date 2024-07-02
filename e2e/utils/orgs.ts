import request from "supertest";
import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const api = {
  register: "/api/orgs/register",
};

const org = {
  name: "Org Name",
  email: "org@example.com",
  password: "password",
  address: "Org Address",
  phone: "1234567890",
  city: "Org City",
};

export async function registerOrg(app: FastifyInstance) {
  const response = await request(app.server).post(api.register).send(org);

  return response;
}
