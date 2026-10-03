import type { MiddlewareHandler } from "hono";
import { randomUUID } from "node:crypto";

import type { AppEnv } from "../types";

const REQUEST_ID_HEADER = "X-Request-ID";

export const requestIdMiddleware: MiddlewareHandler<AppEnv> = async (
  c,
  next,
) => {
  const incomingRequestId = c.req.header(REQUEST_ID_HEADER);

  const requestId = incomingRequestId?.trim() || randomUUID();

  c.set("requestId", requestId);

  await next();

  c.header(REQUEST_ID_HEADER, requestId);
};