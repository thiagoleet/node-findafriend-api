import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { registerOrg } from "../utils/orgs";

describe("[E2E] Register", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await registerOrg(app);

    expect(response.status).toEqual(201);
  });
});
