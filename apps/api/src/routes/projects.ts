import { Hono } from "hono";

import type { AppEnv } from "../types";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project";
import {
  createProjectService,
  deleteProjectService,
  getProjectService,
  listProjectsService,
  updateProjectService,
} from "../services/project.service";

export const projectRoutes = new Hono<AppEnv>();

projectRoutes.post("/organizations/:organizationId/projects", async (c) => {
  const body = await c.req.json();
  const input = createProjectSchema.parse(body);

  const project = await createProjectService(
    c.req.param("organizationId"),
    input,
  );

  return c.json(
    {
      data: project,
      requestId: c.get("requestId"),
    },
    201,
  );
});

projectRoutes.get(
  "/organizations/:organizationId/projects",
  async (c) => {
    const projects = await listProjectsService(
      c.req.param("organizationId"),
    );

    return c.json({
      data: projects,
      requestId: c.get("requestId"),
    });
  },
);

projectRoutes.get("/projects/:id", async (c) => {
  const project = await getProjectService(c.req.param("id"));

  if (!project) {
    return c.json(
      {
        error: {
          code: "PROJECT_NOT_FOUND",
          message: "Project not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: project,
    requestId: c.get("requestId"),
  });
});

projectRoutes.patch("/projects/:id", async (c) => {
  const body = await c.req.json();
  const input = updateProjectSchema.parse(body);

  const project = await updateProjectService(c.req.param("id"), input);

  if (!project) {
    return c.json(
      {
        error: {
          code: "PROJECT_NOT_FOUND",
          message: "Project not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: project,
    requestId: c.get("requestId"),
  });
});

projectRoutes.delete("/projects/:id", async (c) => {
  const project = await deleteProjectService(c.req.param("id"));

  if (!project) {
    return c.json(
      {
        error: {
          code: "PROJECT_NOT_FOUND",
          message: "Project not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: project,
    requestId: c.get("requestId"),
  });
});