export type ToolId = string;

export type ToolSideEffect =
  | "none"
  | "internal"
  | "external";

export type ToolReversibility =
  | "reversible"
  | "partially_reversible"
  | "irreversible";

export type ToolCapability =
  | "network_read"
  | "network_write"
  | "data_read"
  | "data_write"
  | "external_communication"
  | "financial_operation"
  | "destructive_write"
  | "code_execution";

export type DataSensitivity =
  | "public"
  | "internal"
  | "confidential"
  | "sensitive";

export interface ToolDefinition {
  id: ToolId;
  name: string;
  description?: string;

  capabilities: ToolCapability[];

  sideEffect: ToolSideEffect;
  reversibility: ToolReversibility;

  dataAccess: DataSensitivity[];

  enabled: boolean;

  metadata?: Record<string, unknown>;
}