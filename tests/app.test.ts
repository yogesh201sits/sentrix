import { describe, expect, test } from "bun:test";

import { createApp } from "../apps/api/src/app";

interface HealthResponse {
  data: {
    status: "ok" | "ready";
    service: string;
  };
  requestId: string;
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    requestId: string;
  };
  requestId: string;
}

describe("@sentrix/api", () => {
  const app = createApp();

  test("health endpoint returns ok", async () => {
    const response = await app.request("/health");

    expect(response.status).toBe(200);

    const body = (await response.json()) as HealthResponse;

    expect(body.data.status).toBe("ok");
    expect(body.data.service).toBe("@sentrix/api");
    expect(body.requestId).toBeDefined();
  });

  test("health endpoint returns request id header", async () => {
    const response = await app.request("/health");

    const requestId = response.headers.get("X-Request-ID");

    expect(requestId).toBeDefined();
    expect(requestId).toBeTruthy();
  });

  test("preserves incoming request id", async () => {
    const requestId = "request-test-123";

    const response = await app.request("/health", {
      headers: {
        "X-Request-ID": requestId,
      },
    });

    expect(response.headers.get("X-Request-ID")).toBe(requestId);

    const body = (await response.json()) as HealthResponse;

    expect(body.requestId).toBe(requestId);
  });

  test("readiness endpoint returns ready", async () => {
    const response = await app.request("/health/ready");

    expect(response.status).toBe(200);

    const body = (await response.json()) as HealthResponse;

    expect(body.data.status).toBe("ready");
  });

  test("unknown routes return structured 404", async () => {
    const response = await app.request("/does-not-exist");

    expect(response.status).toBe(404);

    const body = (await response.json()) as ErrorResponse;

    expect(body.error.code).toBe("NOT_FOUND");
    expect(body.error.message).toBe("Route not found");
    expect(body.requestId).toBeDefined();
  });
});