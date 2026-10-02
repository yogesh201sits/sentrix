export type EvidenceId = string;

export type EvidenceType =
  | "identity"
  | "authorization"
  | "payment_status"
  | "account_status"
  | "resource_state"
  | "policy_context"
  | "external_verification"
  | "custom";

export type EvidenceSourceType =
  | "internal_service"
  | "external_service"
  | "database"
  | "user"
  | "system";

export interface EvidenceSource {
  type: EvidenceSourceType;
  name: string;
  reference?: string;
}

export interface Evidence {
  id: EvidenceId;

  type: EvidenceType;

  source: EvidenceSource;

  value: unknown;

  collectedAt: string;

  expiresAt?: string;

  metadata?: Record<string, unknown>;
}