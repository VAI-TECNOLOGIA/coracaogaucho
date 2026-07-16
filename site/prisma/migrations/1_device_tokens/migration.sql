-- CreateTable
CREATE TABLE "DeviceToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL DEFAULT 'android',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceToken_token_key" ON "DeviceToken"("token");

-- CreateIndex
CREATE INDEX "DeviceToken_ativo_idx" ON "DeviceToken"("ativo");

