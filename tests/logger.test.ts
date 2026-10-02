import { describe, expect, test } from "bun:test";

import {
  createChildLogger,
  createLogger,
} from "../packages/logger/src/index";

describe("@sentrix/logger", () => {
  test("creates a logger", () => {
    const logger = createLogger({
      service: "test-service",
    });

    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  test("creates a child logger with context", () => {
    const logger = createLogger({
      service: "test-service",
    });

    const child = createChildLogger(logger, {
      requestId: "req_123",
      actionId: "action_123",
      projectId: "project_123",
    });

    expect(child).toBeDefined();
    expect(typeof child.info).toBe("function");
  });
});