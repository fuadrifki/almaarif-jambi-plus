export type AttendanceStatus = 'present' | 'sick' | 'permission' | 'absent';

export type Attendance = {
  id: string;
  studentId: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  date: string;
  time: string;
  status: AttendanceStatus;
  notes: string;
};
