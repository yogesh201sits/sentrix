import { Hono } from "hono";

import type { AppEnv } from "../types";

export const healthRoutes = new Hono<AppEnv>();

healthRoutes.get("/health", (c) => {
  return c.json({
    data: {
      status: "ok",
      service: "@sentrix/api",
    },
    requestId: c.get("requestId"),
  });
});

healthRoutes.get("/health/ready", (c) => {
  return c.json({
    data: {
      status: "ready",
      service: "@sentrix/api",
    },
    requestId: c.get("requestId"),
  });
});