ALTER TABLE "attendance_sessions" ALTER COLUMN "scheduled_teacher_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attendance_sessions" ADD COLUMN "scheduled_teacher_id" integer;