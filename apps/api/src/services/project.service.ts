import {
  createProject,
  deleteProject,
  getProjectById,
  listProjectsByOrganization,
  updateProject,
} from "@sentrix/database";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "../schemas/project";

export async function createProjectService(
  organizationId: string,
  input: CreateProjectInput,
) {
  return createProject({
    organizationId,
    ...input,
  });
}

export async function getProjectService(id: string) {
  return getProjectById(id);
}

export async function listProjectsService(organizationId: string) {
  return listProjectsByOrganization(organizationId);
}

export async function updateProjectService(
  id: string,
  input: UpdateProjectInput,
) {
  return updateProject(id, input.name);
}

export async function deleteProjectService(id: string) {
  return deleteProject(id);
}