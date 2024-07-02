import request from "supertest";
import { FastifyInstance } from "fastify";

const api = {
  register: "/api/pets/register",
};

const pet = {
  name: "Pet Name",
  age: 1,
  species: "Dog",
  weight: 1,
  city: "Pet City",
};

export async function registerPet(app: FastifyInstance, token: string) {
  const response = await request(app.server)
    .post(api.register)
    .set("Authorization", `Bearer ${token}`)
    .send(pet);

  return response;
}
