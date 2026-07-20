ALTER TABLE "attendance_sessions" ADD COLUMN "original_teacher_status" varchar(20);--> statement-breakpoint
ALTER TABLE "attendance_sessions" ADD COLUMN "substitute_notes" text;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "room" varchar(100) NOT NULL;