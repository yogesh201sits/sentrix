import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
});

export type ApiEnv = z.infer<typeof envSchema>;

export function loadEnv(
  environment: Record<string, string | undefined> = process.env,
): ApiEnv {
  return envSchema.parse(environment);
}