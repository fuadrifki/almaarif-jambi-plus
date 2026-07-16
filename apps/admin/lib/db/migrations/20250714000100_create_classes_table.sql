CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  level INTEGER NOT NULL,
  academic_level VARCHAR(100) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_classes_code ON classes(code);
CREATE INDEX idx_classes_name ON classes(name);
CREATE INDEX idx_classes_level ON classes(level);
CREATE INDEX idx_classes_academic_level ON classes(academic_level);
CREATE INDEX idx_classes_gender ON classes(gender);

-- Add foreign key constraint if needed (not required as per spec)
-- ALTER TABLE students ADD CONSTRAINT fk_students_class FOREIGN KEY (class_id) REFERENCES classes(id);
-- ALTER TABLE attendance_sessions ADD CONSTRAINT fk_attendance_sessions_class FOREIGN KEY (class_id) REFERENCES classes(id);
