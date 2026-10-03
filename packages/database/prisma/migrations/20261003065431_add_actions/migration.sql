-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "parameters" JSONB NOT NULL,
    "agentId" TEXT NOT NULL,
    "agentName" TEXT,
    "agentVersion" TEXT,
    "environment" TEXT NOT NULL,
    "sessionId" TEXT,
    "traceId" TEXT,
    "userId" TEXT,
    "metadata" JSONB,
    "requestedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Action_projectId_idx" ON "Action"("projectId");

-- CreateIndex
CREATE INDEX "Action_agentId_idx" ON "Action"("agentId");

-- CreateIndex
CREATE INDEX "Action_requestedAt_idx" ON "Action"("requestedAt");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
