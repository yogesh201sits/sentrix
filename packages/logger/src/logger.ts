import pino from "pino";

import type {
  LogContext,
  LoggerOptions,
  SentrixLogger,
} from "./types";

export function createLogger(
  options: LoggerOptions,
): SentrixLogger {
  const {
    service,
    level = "info",
    environment = "development",
  } = options;

  return pino({
    level,

    base: {
      service,
      environment,
    },

    timestamp: pino.stdTimeFunctions.isoTime,

    serializers: {
      err: pino.stdSerializers.err,
    },
  });
}

export function createChildLogger(
  logger: SentrixLogger,
  context: LogContext,
): SentrixLogger {
  return logger.child(context);
}