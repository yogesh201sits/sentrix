import {
  afterAll,
  beforeAll,
  describe,
  expect,
  test,
} from "bun:test";

import {
  createOrganization,
  createProject,
  deleteOrganization,
  getOrganizationById,
  getProjectById,
  listProjectsByOrganization,
  prisma,
} from "./index";

describe("@sentrix/database", () => {
  let organizationId: string;
  let projectId: string;

  beforeAll(async () => {
    await prisma.$connect();
  });

  test("connects to PostgreSQL", async () => {
    const result = await prisma.$queryRaw<{ result: number }[]>`
      SELECT 1 AS result
    `;

    expect(result[0]?.result).toBe(1);
  });

  test("creates an organization", async () => {
    const organization = await createOrganization({
      name: "Sentrix Test Organization",
    });

    organizationId = organization.id;

    expect(organization.id).toBeDefined();
    expect(organization.name).toBe("Sentrix Test Organization");
  });

  test("retrieves an organization", async () => {
    const organization = await getOrganizationById(
      organizationId,
    );

    expect(organization).not.toBeNull();
    expect(organization?.id).toBe(organizationId);
  });

  test("creates a project under an organization", async () => {
    const project = await createProject({
      organizationId,
      name: "Sentrix Test Project",
    });

    projectId = project.id;

    expect(project.id).toBeDefined();
    expect(project.organizationId).toBe(organizationId);
  });

  test("retrieves a project", async () => {
    const project = await getProjectById(projectId);

    expect(project).not.toBeNull();
    expect(project?.organizationId).toBe(organizationId);
  });

  test("lists projects belonging to an organization", async () => {
    const projects =
      await listProjectsByOrganization(organizationId);

    expect(
      projects.some((project) => project.id === projectId),
    ).toBe(true);
  });

  afterAll(async () => {
    if (organizationId) {
      await deleteOrganization(organizationId);
    }

    await prisma.$disconnect();
  });
});