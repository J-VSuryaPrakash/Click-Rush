CREATE TYPE "game_status" AS ENUM('ACTIVE', 'COMPLETED', 'EXPIRED');--> statement-breakpoint
ALTER TABLE "game_sessions" ADD COLUMN "status" "game_status" DEFAULT 'ACTIVE'::"game_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD COLUMN "expires_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "score" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "ended_at" DROP NOT NULL;--> statement-breakpoint
CREATE INDEX "game_sessions_status_expires_at_idx" ON "game_sessions" ("status","expires_at");