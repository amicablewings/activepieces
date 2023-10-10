import { MigrationInterface, QueryRunner } from 'typeorm'

export class Sql3MigrationCloud1690478550304 implements MigrationInterface {
    name = 'Sql3MigrationCloud1690478550304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "project_member" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "userId" varchar(21) NOT NULL, "projectId" varchar(21) NOT NULL, "role" varchar NOT NULL, "status" varchar NOT NULL)')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_project_member_project_id_user_id" ON "project_member" ("projectId", "userId") ')
        await queryRunner.query('CREATE TABLE "app_credential" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "appName" varchar NOT NULL, "projectId" varchar(21) NOT NULL, "settings" text NOT NULL)')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_app_credentials_projectId_appName" ON "app_credential" ("appName", "projectId") ')
        await queryRunner.query('CREATE TABLE "connection_key" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "settings" text NOT NULL)')
        await queryRunner.query('CREATE INDEX "idx_connection_key_project_id" ON "connection_key" ("projectId") ')
        await queryRunner.query('CREATE TABLE "project_plan" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "name" varchar NOT NULL, "stripeCustomerId" varchar NOT NULL, "stripeSubscriptionId" varchar, "minimumPollingInterval" integer NOT NULL, "activeFlows" integer NOT NULL, "connections" integer NOT NULL, "teamMembers" integer NOT NULL, "tasks" integer NOT NULL, "tasksPerDay" integer, "subscriptionStartDatetime" datetime NOT NULL, CONSTRAINT "REL_4f52e89612966d95843e4158bb" UNIQUE ("projectId"))')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_plan_project_id" ON "project_plan" ("projectId") ')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_plan_stripe_customer_id" ON "project_plan" ("stripeCustomerId") ')
        await queryRunner.query('CREATE TABLE "project_usage" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "consumedTasks" integer NOT NULL, "nextResetDatetime" datetime NOT NULL)')
        await queryRunner.query('CREATE INDEX "idx_project_usage_project_id" ON "project_usage" ("projectId") ')
        await queryRunner.query('CREATE TABLE "flow_template" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "description" varchar NOT NULL, "projectId" varchar, "template" text NOT NULL, "tags" varchar array NOT NULL, "pieces" varchar array NOT NULL, "pinnedOrder" integer, "blogUrl" varchar)')
        await queryRunner.query('CREATE INDEX "idx_flow_template_tags" ON "flow_template" ("tags") ')
        await queryRunner.query('CREATE INDEX "idx_flow_template_pieces" ON "flow_template" ("pieces") ')
        await queryRunner.query('CREATE TABLE "appsumo" ("uuid" varchar PRIMARY KEY NOT NULL, "plan_id" varchar NOT NULL, "activation_email" varchar NOT NULL)')
        await queryRunner.query('DROP INDEX "idx_app_credentials_projectId_appName"')
        await queryRunner.query('CREATE TABLE "temporary_app_credential" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "appName" varchar NOT NULL, "projectId" varchar(21) NOT NULL, "settings" text NOT NULL, CONSTRAINT "FK_d82bfb4c7432a69dc2419083a0e" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_app_credential"("id", "created", "updated", "appName", "projectId", "settings") SELECT "id", "created", "updated", "appName", "projectId", "settings" FROM "app_credential"')
        await queryRunner.query('DROP TABLE "app_credential"')
        await queryRunner.query('ALTER TABLE "temporary_app_credential" RENAME TO "app_credential"')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_app_credentials_projectId_appName" ON "app_credential" ("appName", "projectId") ')
        await queryRunner.query('DROP INDEX "idx_connection_key_project_id"')
        await queryRunner.query('CREATE TABLE "temporary_connection_key" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "settings" text NOT NULL, CONSTRAINT "FK_03177dc6779e6e147866d43c050" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_connection_key"("id", "created", "updated", "projectId", "settings") SELECT "id", "created", "updated", "projectId", "settings" FROM "connection_key"')
        await queryRunner.query('DROP TABLE "connection_key"')
        await queryRunner.query('ALTER TABLE "temporary_connection_key" RENAME TO "connection_key"')
        await queryRunner.query('CREATE INDEX "idx_connection_key_project_id" ON "connection_key" ("projectId") ')
        await queryRunner.query('DROP INDEX "idx_plan_project_id"')
        await queryRunner.query('DROP INDEX "idx_plan_stripe_customer_id"')
        await queryRunner.query('CREATE TABLE "temporary_project_plan" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "name" varchar NOT NULL, "stripeCustomerId" varchar NOT NULL, "stripeSubscriptionId" varchar, "minimumPollingInterval" integer NOT NULL, "activeFlows" integer NOT NULL, "connections" integer NOT NULL, "teamMembers" integer NOT NULL, "tasks" integer NOT NULL, "tasksPerDay" integer, "subscriptionStartDatetime" datetime NOT NULL, CONSTRAINT "REL_4f52e89612966d95843e4158bb" UNIQUE ("projectId"), CONSTRAINT "fk_project_plan_project_id" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_project_plan"("id", "created", "updated", "projectId", "name", "stripeCustomerId", "stripeSubscriptionId", "minimumPollingInterval", "activeFlows", "connections", "teamMembers", "tasks", "tasksPerDay", "subscriptionStartDatetime") SELECT "id", "created", "updated", "projectId", "name", "stripeCustomerId", "stripeSubscriptionId", "minimumPollingInterval", "activeFlows", "connections", "teamMembers", "tasks", "tasksPerDay", "subscriptionStartDatetime" FROM "project_plan"')
        await queryRunner.query('DROP TABLE "project_plan"')
        await queryRunner.query('ALTER TABLE "temporary_project_plan" RENAME TO "project_plan"')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_plan_project_id" ON "project_plan" ("projectId") ')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_plan_stripe_customer_id" ON "project_plan" ("stripeCustomerId") ')
        await queryRunner.query('DROP INDEX "idx_project_usage_project_id"')
        await queryRunner.query('CREATE TABLE "temporary_project_usage" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "consumedTasks" integer NOT NULL, "nextResetDatetime" datetime NOT NULL, CONSTRAINT "fk_project_usage_project_id" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_project_usage"("id", "created", "updated", "projectId", "consumedTasks", "nextResetDatetime") SELECT "id", "created", "updated", "projectId", "consumedTasks", "nextResetDatetime" FROM "project_usage"')
        await queryRunner.query('DROP TABLE "project_usage"')
        await queryRunner.query('ALTER TABLE "temporary_project_usage" RENAME TO "project_usage"')
        await queryRunner.query('CREATE INDEX "idx_project_usage_project_id" ON "project_usage" ("projectId") ')
        await queryRunner.query('DROP INDEX "idx_flow_template_tags"')
        await queryRunner.query('DROP INDEX "idx_flow_template_pieces"')
        await queryRunner.query('CREATE TABLE "temporary_flow_template" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "description" varchar NOT NULL, "projectId" varchar, "template" text NOT NULL, "tags" varchar array NOT NULL, "pieces" varchar array NOT NULL, "pinnedOrder" integer, "blogUrl" varchar, CONSTRAINT "fk_flow_template_project_id" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)')
        await queryRunner.query('INSERT INTO "temporary_flow_template"("id", "created", "updated", "name", "description", "projectId", "template", "tags", "pieces", "pinnedOrder", "blogUrl") SELECT "id", "created", "updated", "name", "description", "projectId", "template", "tags", "pieces", "pinnedOrder", "blogUrl" FROM "flow_template"')
        await queryRunner.query('DROP TABLE "flow_template"')
        await queryRunner.query('ALTER TABLE "temporary_flow_template" RENAME TO "flow_template"')
        await queryRunner.query('CREATE INDEX "idx_flow_template_tags" ON "flow_template" ("tags") ')
        await queryRunner.query('CREATE INDEX "idx_flow_template_pieces" ON "flow_template" ("pieces") ')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX "idx_flow_template_pieces"')
        await queryRunner.query('DROP INDEX "idx_flow_template_tags"')
        await queryRunner.query('ALTER TABLE "flow_template" RENAME TO "temporary_flow_template"')
        await queryRunner.query('CREATE TABLE "flow_template" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "description" varchar NOT NULL, "projectId" varchar, "template" text NOT NULL, "tags" varchar array NOT NULL, "pieces" varchar array NOT NULL, "pinnedOrder" integer, "blogUrl" varchar)')
        await queryRunner.query('INSERT INTO "flow_template"("id", "created", "updated", "name", "description", "projectId", "template", "tags", "pieces", "pinnedOrder", "blogUrl") SELECT "id", "created", "updated", "name", "description", "projectId", "template", "tags", "pieces", "pinnedOrder", "blogUrl" FROM "temporary_flow_template"')
        await queryRunner.query('DROP TABLE "temporary_flow_template"')
        await queryRunner.query('CREATE INDEX "idx_flow_template_pieces" ON "flow_template" ("pieces") ')
        await queryRunner.query('CREATE INDEX "idx_flow_template_tags" ON "flow_template" ("tags") ')
        await queryRunner.query('DROP INDEX "idx_project_usage_project_id"')
        await queryRunner.query('ALTER TABLE "project_usage" RENAME TO "temporary_project_usage"')
        await queryRunner.query('CREATE TABLE "project_usage" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "consumedTasks" integer NOT NULL, "nextResetDatetime" datetime NOT NULL)')
        await queryRunner.query('INSERT INTO "project_usage"("id", "created", "updated", "projectId", "consumedTasks", "nextResetDatetime") SELECT "id", "created", "updated", "projectId", "consumedTasks", "nextResetDatetime" FROM "temporary_project_usage"')
        await queryRunner.query('DROP TABLE "temporary_project_usage"')
        await queryRunner.query('CREATE INDEX "idx_project_usage_project_id" ON "project_usage" ("projectId") ')
        await queryRunner.query('DROP INDEX "idx_plan_stripe_customer_id"')
        await queryRunner.query('DROP INDEX "idx_plan_project_id"')
        await queryRunner.query('ALTER TABLE "project_plan" RENAME TO "temporary_project_plan"')
        await queryRunner.query('CREATE TABLE "project_plan" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "name" varchar NOT NULL, "stripeCustomerId" varchar NOT NULL, "stripeSubscriptionId" varchar, "minimumPollingInterval" integer NOT NULL, "activeFlows" integer NOT NULL, "connections" integer NOT NULL, "teamMembers" integer NOT NULL, "tasks" integer NOT NULL, "tasksPerDay" integer, "subscriptionStartDatetime" datetime NOT NULL, CONSTRAINT "REL_4f52e89612966d95843e4158bb" UNIQUE ("projectId"))')
        await queryRunner.query('INSERT INTO "project_plan"("id", "created", "updated", "projectId", "name", "stripeCustomerId", "stripeSubscriptionId", "minimumPollingInterval", "activeFlows", "connections", "teamMembers", "tasks", "tasksPerDay", "subscriptionStartDatetime") SELECT "id", "created", "updated", "projectId", "name", "stripeCustomerId", "stripeSubscriptionId", "minimumPollingInterval", "activeFlows", "connections", "teamMembers", "tasks", "tasksPerDay", "subscriptionStartDatetime" FROM "temporary_project_plan"')
        await queryRunner.query('DROP TABLE "temporary_project_plan"')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_plan_stripe_customer_id" ON "project_plan" ("stripeCustomerId") ')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_plan_project_id" ON "project_plan" ("projectId") ')
        await queryRunner.query('DROP INDEX "idx_connection_key_project_id"')
        await queryRunner.query('ALTER TABLE "connection_key" RENAME TO "temporary_connection_key"')
        await queryRunner.query('CREATE TABLE "connection_key" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "projectId" varchar(21) NOT NULL, "settings" text NOT NULL)')
        await queryRunner.query('INSERT INTO "connection_key"("id", "created", "updated", "projectId", "settings") SELECT "id", "created", "updated", "projectId", "settings" FROM "temporary_connection_key"')
        await queryRunner.query('DROP TABLE "temporary_connection_key"')
        await queryRunner.query('CREATE INDEX "idx_connection_key_project_id" ON "connection_key" ("projectId") ')
        await queryRunner.query('DROP INDEX "idx_app_credentials_projectId_appName"')
        await queryRunner.query('ALTER TABLE "app_credential" RENAME TO "temporary_app_credential"')
        await queryRunner.query('CREATE TABLE "app_credential" ("id" varchar(21) PRIMARY KEY NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "appName" varchar NOT NULL, "projectId" varchar(21) NOT NULL, "settings" text NOT NULL)')
        await queryRunner.query('INSERT INTO "app_credential"("id", "created", "updated", "appName", "projectId", "settings") SELECT "id", "created", "updated", "appName", "projectId", "settings" FROM "temporary_app_credential"')
        await queryRunner.query('DROP TABLE "temporary_app_credential"')
        await queryRunner.query('CREATE UNIQUE INDEX "idx_app_credentials_projectId_appName" ON "app_credential" ("appName", "projectId") ')
        await queryRunner.query('DROP TABLE "appsumo"')
        await queryRunner.query('DROP INDEX "idx_flow_template_pieces"')
        await queryRunner.query('DROP INDEX "idx_flow_template_tags"')
        await queryRunner.query('DROP TABLE "flow_template"')
        await queryRunner.query('DROP INDEX "idx_project_usage_project_id"')
        await queryRunner.query('DROP TABLE "project_usage"')
        await queryRunner.query('DROP INDEX "idx_plan_stripe_customer_id"')
        await queryRunner.query('DROP INDEX "idx_plan_project_id"')
        await queryRunner.query('DROP TABLE "project_plan"')
        await queryRunner.query('DROP INDEX "idx_connection_key_project_id"')
        await queryRunner.query('DROP TABLE "connection_key"')
        await queryRunner.query('DROP INDEX "idx_app_credentials_projectId_appName"')
        await queryRunner.query('DROP TABLE "app_credential"')
        await queryRunner.query('DROP INDEX "idx_project_member_project_id_user_id"')
        await queryRunner.query('DROP TABLE "project_member"')
    }

}
