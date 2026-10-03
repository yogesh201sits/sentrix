import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  listOrganizations,
  updateOrganization,
} from "@sentrix/database";

import type {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "../schemas/organization";

export async function createOrganizationService(
  input: CreateOrganizationInput,
) {
  return createOrganization(input);
}

export async function getOrganizationService(id: string) {
  return getOrganizationById(id);
}

export async function listOrganizationsService() {
  return listOrganizations();
}

export async function updateOrganizationService(
  id: string,
  input: UpdateOrganizationInput,
) {
  return updateOrganization(id, input.name);
}

export async function deleteOrganizationService(id: string) {
  return deleteOrganization(id);
}