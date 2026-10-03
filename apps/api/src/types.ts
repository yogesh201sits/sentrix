import type { Env } from "hono";

export type AppEnv = Env & {
  Variables: {
    requestId: string;
  };
};