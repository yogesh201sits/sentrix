import { Hono } from "hono";

import { getActionById, listActionsByProject } from "@sentrix/database";


import type { AppEnv } from "../types";
import { createActionSchema } from "../schemas/action";
import { createActionService } from "../services/action.service";

export const actionRoutes = new Hono<AppEnv>();

actionRoutes.post("/projects/:projectId/actions", async (c) => {
  const projectId = c.req.param("projectId");

  const body = await c.req.json();
  const input = createActionSchema.parse(body);

  const action = await createActionService(projectId, input);

  return c.json(
    {
      data: action,
      requestId: c.get("requestId"),
    },
    201,
  );
});

actionRoutes.get("/projects/:projectId/actions", async (c) => {
  const projectId = c.req.param("projectId");

  const actions = await listActionsByProject(projectId);

  return c.json({
    data: actions,
    requestId: c.get("requestId"),
  });
});

actionRoutes.get("/actions/:id", async (c) => {
  const action = await getActionById(c.req.param("id"));

  if (!action) {
    return c.json(
      {
        error: {
          code: "ACTION_NOT_FOUND",
          message: "Action not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: action,
    requestId: c.get("requestId"),
  });
});