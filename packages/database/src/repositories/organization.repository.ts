import { prisma } from "../client";

export interface CreateOrganizationInput {
  name: string;
}

export async function createOrganization(
  input: CreateOrganizationInput,
) {
  return prisma.organization.create({
    data: {
      name: input.name,
    },
  });
}

export async function getOrganizationById(id: string) {
  return prisma.organization.findUnique({
    where: {
      id,
    },
  });
}

export async function listOrganizations() {
  return prisma.organization.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateOrganization(
  id: string,
  name: string,
) {
  return prisma.organization.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteOrganization(id: string) {
  return prisma.organization.delete({
    where: {
      id,
    },
  });
}