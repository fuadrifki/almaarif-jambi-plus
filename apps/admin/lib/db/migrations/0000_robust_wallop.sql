CREATE TABLE "attendance_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"status" varchar(20) NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attendance_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacher_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"schedule_id" integer NOT NULL,
	"date" varchar(10) NOT NULL,
	"time" varchar(5) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_subjects" (
	"class_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "unique_class_subject" UNIQUE("class_id","subject_id")
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"level" integer NOT NULL,
	"academic_level" varchar(100) NOT NULL,
	"gender" "gender" NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "classes_code_unique" UNIQUE("code"),
	CONSTRAINT "unique_code" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"nis" varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	"class_id" varchar(50) NOT NULL,
	"room" varchar(100) NOT NULL,
	"guardian_name" varchar(255) NOT NULL,
	"guardian_phone" varchar(20) NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_nis_unique" UNIQUE("nis")
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subjects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_session_id_attendance_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."attendance_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_subjects" ADD CONSTRAINT "class_subjects_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_subjects" ADD CONSTRAINT "class_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_attendance_records_session_id" ON "attendance_records" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_student_id" ON "attendance_records" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_sessions_class_date" ON "attendance_sessions" USING btree ("class_id","date");--> statement-breakpoint
CREATE INDEX "idx_attendance_sessions_teacher_id" ON "attendance_sessions" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "idx_class_subjects_class_id" ON "class_subjects" USING btree ("class_id");--> statement-breakpoint
CREATE INDEX "idx_class_subjects_subject_id" ON "class_subjects" USING btree ("subject_id");--> statement-breakpoint
CREATE INDEX "idx_classes_code" ON "classes" USING btree ("code");--> statement-breakpoint
CREATE INDEX "idx_classes_name" ON "classes" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_classes_level" ON "classes" USING btree ("level");--> statement-breakpoint
CREATE INDEX "idx_classes_academic_level" ON "classes" USING btree ("academic_level");--> statement-breakpoint
CREATE INDEX "idx_classes_gender" ON "classes" USING btree ("gender");--> statement-breakpoint
CREATE INDEX "idx_students_nis" ON "students" USING btree ("nis");--> statement-breakpoint
CREATE INDEX "idx_students_class_id" ON "students" USING btree ("class_id");--> statement-breakpoint
CREATE INDEX "idx_subjects_name" ON "subjects" USING btree ("name");
