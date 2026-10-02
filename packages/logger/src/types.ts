import type { Logger } from "pino";

export interface LoggerOptions {
  service: string;
  level?: string;
  environment?: string;
}

export interface LogContext {
  requestId?: string;
  traceId?: string;
  projectId?: string;
  actionId?: string;
  agentId?: string;
  userId?: string;
}

export type SentrixLogger = Logger;