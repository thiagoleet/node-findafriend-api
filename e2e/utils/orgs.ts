import request from "supertest";
import { FastifyInstance } from "fastify";

const api = {
  register: "/api/orgs/register",
  authenticate: "/api/orgs/authenticate",
  refresh: "/api/orgs/refresh",
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

export async function authenticateOrg(app: FastifyInstance) {
  const response = await request(app.server).post(api.authenticate).send({
    email: org.email,
    password: org.password,
  });

  return response;
}
