import type { Attendance } from '@/features/attendance/types';

type Store = {
  attendances: Attendance[];
  nextAttendanceId: number;
};

const store: Store = {
  attendances: [],
  nextAttendanceId: 1,
};

export const getStore = (): Store => store;

export const generateAttendanceId = (): string => {
  const id = String(store.nextAttendanceId);

  store.nextAttendanceId++;

  return id;
};
