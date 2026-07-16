ALTER TABLE "classes" ALTER COLUMN "gender" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "guardian_name" SET DATA TYPE varchar(225);--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "room";