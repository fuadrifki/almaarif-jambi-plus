ALTER TABLE "attendance_sessions" ALTER COLUMN "teacher_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "attendance_sessions" ALTER COLUMN "class_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "attendance_sessions" ALTER COLUMN "subject_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "class_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "attendance_sessions" ADD COLUMN "schedule_id" integer NOT NULL;