import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
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
    const authResponse = await authenticateOrg(app);

    // Get the cookies 🍪
    const cookies = authResponse.get("Set-Cookie") as string[];

    const response = await request(app.server)
      .patch("/api/orgs/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
