export type DecisionOutcome =
  | "ALLOW"
  | "DENY"
  | "REQUIRE_APPROVAL"
  | "NO_ACTION"
  | "INSUFFICIENT_EVIDENCE";

export type DecisionReasonCode =
  | "POLICY_ALLOWED"
  | "POLICY_DENIED"
  | "APPROVAL_REQUIRED"
  | "NO_MATCHING_POLICY"
  | "MISSING_EVIDENCE"
  | "LIMIT_EXCEEDED"
  | "RISK_TOO_HIGH";

export interface DecisionReason {
  code: DecisionReasonCode;
  message: string;
  policyId?: string;
}

export interface Decision {
  outcome: DecisionOutcome;
  reasons: DecisionReason[];
  evaluatedAt: string;
}