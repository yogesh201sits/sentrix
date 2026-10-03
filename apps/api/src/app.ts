import { Hono } from "hono";

import { organizationRoutes } from "./routes/organizations";
import { projectRoutes } from "./routes/projects";
import { healthRoutes } from "./routes/health";
import { requestIdMiddleware } from "./middleware/request-id";
import type { AppEnv } from "./types";

export function createApp() {
  const app = new Hono<AppEnv>();

  app.use("*", requestIdMiddleware);

  app.route("/", healthRoutes);
  app.route("/", organizationRoutes);
  app.route("/", projectRoutes);

  app.notFound((c) => {
    const requestId = c.get("requestId");

    return c.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "Route not found",
          requestId,
        },
        requestId,
      },
      404,
    );
  });

  app.onError((error, c) => {
    const requestId = c.get("requestId");

    console.error(error);

    return c.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
          requestId,
        },
        requestId,
      },
      500,
    );
  });

  return app;
}