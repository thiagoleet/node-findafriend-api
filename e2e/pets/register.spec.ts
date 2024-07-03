import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { authenticateOrg, registerOrg } from "../utils/orgs";
import { registerPet } from "../utils/pets";

describe("[E2E] Pet - Register", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a new pet", async () => {
    // Create a new organization
    await registerOrg(app);

    // Authenticate the organization
    const authResponse = await authenticateOrg(app);

    // Get the token
    const { token } = authResponse.body;

    // Register a new pet
    const response = await registerPet(app, token);

    expect(response.status).toEqual(201);
  });
});
