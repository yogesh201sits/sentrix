export { prisma } from "./client";

export type {
  Prisma,
  Organization,
  Project,
} from "../generated/prisma/client";

export {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  listOrganizations,
  updateOrganization,
} from "./repositories/organization.repository";

export {
  createProject,
  deleteProject,
  getProjectById,
  listProjectsByOrganization,
  updateProject,
} from "./repositories/project.repository";

export type {
  CreateOrganizationInput,
} from "./repositories/organization.repository";

export type {
  CreateProjectInput,
} from "./repositories/project.repository";