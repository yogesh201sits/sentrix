export type PolicyId = string;

export type PolicyEffect =
  | "allow"
  | "deny"
  | "require_approval";

export type PolicyConditionOperator =
  | "equals"
  | "not_equals"
  | "in"
  | "not_in"
  | "greater_than"
  | "greater_than_or_equal"
  | "less_than"
  | "less_than_or_equal"
  | "contains";

export type PolicyMatchField =
  | "action"
  | "tool"
  | "capability"
  | "agent"
  | "environment"
  | "user"
  | "data_sensitivity";

export interface PolicyCondition {
  field: PolicyMatchField;
  operator: PolicyConditionOperator;
  value: unknown;
}

export interface PolicyMatch {
  conditions: PolicyCondition[];
}

export interface PolicyDefinition {
  id: PolicyId;
  name: string;
  description?: string;

  priority: number;

  enabled: boolean;

  match: PolicyMatch;

  effect: PolicyEffect;

  metadata?: Record<string, unknown>;
}