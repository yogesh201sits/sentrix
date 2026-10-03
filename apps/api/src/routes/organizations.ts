import { Hono } from "hono";

import type { AppEnv } from "../types";
import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "../schemas/organization";
import {
  createOrganizationService,
  deleteOrganizationService,
  getOrganizationService,
  listOrganizationsService,
  updateOrganizationService,
} from "../services/organization.service";

export const organizationRoutes = new Hono<AppEnv>();

organizationRoutes.post("/organizations", async (c) => {
  const body = await c.req.json();
  const input = createOrganizationSchema.parse(body);

  const organization = await createOrganizationService(input);

  return c.json(
    {
      data: organization,
      requestId: c.get("requestId"),
    },
    201,
  );
});

organizationRoutes.get("/organizations", async (c) => {
  const organizations = await listOrganizationsService();

  return c.json({
    data: organizations,
    requestId: c.get("requestId"),
  });
});

organizationRoutes.get("/organizations/:id", async (c) => {
  const organization = await getOrganizationService(c.req.param("id"));

  if (!organization) {
    return c.json(
      {
        error: {
          code: "ORGANIZATION_NOT_FOUND",
          message: "Organization not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: organization,
    requestId: c.get("requestId"),
  });
});

organizationRoutes.patch("/organizations/:id", async (c) => {
  const body = await c.req.json();
  const input = updateOrganizationSchema.parse(body);

  const organization = await updateOrganizationService(
    c.req.param("id"),
    input,
  );

  if (!organization) {
    return c.json(
      {
        error: {
          code: "ORGANIZATION_NOT_FOUND",
          message: "Organization not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: organization,
    requestId: c.get("requestId"),
  });
});

organizationRoutes.delete("/organizations/:id", async (c) => {
  const organization = await deleteOrganizationService(c.req.param("id"));

  if (!organization) {
    return c.json(
      {
        error: {
          code: "ORGANIZATION_NOT_FOUND",
          message: "Organization not found",
          requestId: c.get("requestId"),
        },
        requestId: c.get("requestId"),
      },
      404,
    );
  }

  return c.json({
    data: organization,
    requestId: c.get("requestId"),
  });
});