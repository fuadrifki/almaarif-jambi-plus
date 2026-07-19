import type { ScheduleItem } from './schedule.repository.ts';

type ScheduleRepository = {
  findByClassAndDate(classId: number, date: string): Promise<ScheduleItem[]>;
};

export type { ScheduleRepository };
