import { z } from "zod";

export const createActionSchema = z.object({
  action: z.string().trim().min(1).max(200),

  parameters: z.record(z.string(), z.unknown()),

  agent: z.object({
    id: z.string().trim().min(1).max(200),
    name: z.string().trim().min(1).max(200).optional(),
    version: z.string().trim().min(1).max(100).optional(),
  }),

  context: z.object({
    environment: z.enum([
      "development",
      "staging",
      "production",
    ]),

    sessionId: z.string().trim().min(1).optional(),
    traceId: z.string().trim().min(1).optional(),
    userId: z.string().trim().min(1).optional(),

    metadata: z.record(z.string(), z.unknown()).optional(),
  }),

  requestedAt: z.iso.datetime().optional(),
});

export type CreateActionInput = z.infer<typeof createActionSchema>;