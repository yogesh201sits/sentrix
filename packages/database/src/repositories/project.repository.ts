import { prisma } from "../client";

export interface CreateProjectInput {
  organizationId: string;
  name: string;
}

export async function createProject(
  input: CreateProjectInput,
) {
  return prisma.project.create({
    data: {
      organizationId: input.organizationId,
      name: input.name,
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

export async function listProjectsByOrganization(
  organizationId: string,
) {
  return prisma.project.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateProject(
  id: string,
  name: string,
) {
  return prisma.project.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: {
      id,
    },
  });
}