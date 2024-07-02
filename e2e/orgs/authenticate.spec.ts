import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { authenticateOrg, registerOrg } from "../utils/orgs";

describe("[E2E] Org - Authenticate", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    // Create a new organization
    await registerOrg(app);

    // Authenticate the organization
    const response = await authenticateOrg(app);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
