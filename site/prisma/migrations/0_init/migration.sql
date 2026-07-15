-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "papel" TEXT NOT NULL DEFAULT 'ADMIN',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'apoiador',
    "segmento" TEXT,
    "origem" TEXT NOT NULL DEFAULT 'site-institucional',
    "status" TEXT NOT NULL DEFAULT 'NOVO',
    "observacao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitacaoPrivacidade" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "detalhes" TEXT,
    "origem" TEXT NOT NULL DEFAULT 'web',
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "resolucao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processadoEm" TIMESTAMP(3),
    "processadoPor" TEXT,

    CONSTRAINT "SolicitacaoPrivacidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Lead_segmento_idx" ON "Lead"("segmento");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_origem_idx" ON "Lead"("origem");

-- CreateIndex
CREATE INDEX "Lead_criadoEm_idx" ON "Lead"("criadoEm");

-- CreateIndex
CREATE INDEX "SolicitacaoPrivacidade_status_idx" ON "SolicitacaoPrivacidade"("status");

-- CreateIndex
CREATE INDEX "SolicitacaoPrivacidade_criadoEm_idx" ON "SolicitacaoPrivacidade"("criadoEm");

