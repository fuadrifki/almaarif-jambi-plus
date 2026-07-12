import type { Attendance } from '@/features/attendance/types';
import type { AttendanceRepository } from './types';

import { getStore, generateAttendanceId } from './store';

export const attendanceRepository: AttendanceRepository = {
  findAll() {
    return getStore().attendances;
  },

  findById(id) {
    return getStore().attendances.find((a) => a.id === id) ?? null;
  },

  findByStudentId(studentId) {
    return getStore().attendances.filter((a) => a.studentId === studentId);
  },

  findByTeacherId(teacherId) {
    return getStore().attendances.filter((a) => a.teacherId === teacherId);
  },

  findByClassAndDate(classId, date) {
    return getStore().attendances.filter((a) => a.classId === classId && a.date === date);
  },

  create(data) {
    const record: Attendance = {
      ...data,
      id: generateAttendanceId(),
    };

    getStore().attendances.push(record);

    return record;
  },

  createBatch(records) {
    return records.map((data) => {
      const record: Attendance = {
        ...data,
        id: generateAttendanceId(),
      };

      getStore().attendances.push(record);

      return record;
    });
  },

  deleteByStudentId(studentId) {
    const store = getStore();
    const before = store.attendances.length;

    store.attendances = store.attendances.filter((a) => a.studentId !== studentId);

    return store.attendances.length < before;
  },
};
