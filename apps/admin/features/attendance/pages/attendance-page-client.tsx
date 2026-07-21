'use client';

import { useMemo, useState } from 'react';

import { PageLayout, Surface, Tabs, SelectOption } from '@/components/ui';
import { History, Plus } from 'lucide-react';

import { type AttendanceRecord, type AttendanceSession } from '../types';
import type { Student } from '@/features/students/types';
import { TEACHERS } from '@/lib/db/seed-teachers';
import { formatDate } from '@/lib/utils/date';
import { AttendanceInputSection } from '../components/attendance-input-section';
import { AttendanceHistorySection } from '../components/attendance-history-section';

type SessionWithRecords = AttendanceSession & { records: AttendanceRecord[] };

type AttendancePageClientProps = {
  teacherId: number;
  students: Student[];
  sessions: SessionWithRecords[];
  classes: SelectOption[];
};

type Tab = 'input' | 'history';

export const AttendancePageClient = ({
  teacherId,
  students,
  sessions,
  classes,
}: AttendancePageClientProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('input');

  const teacherLabel = useMemo(() => TEACHERS.find((t) => t.id === teacherId)?.name, [teacherId]);

  return (
    <PageLayout>
      <PageLayout.Header>
        <h1 className="text-2xl font-semibold sm:text-3xl">Absensi</h1>

        <Surface className="flex flex-wrap justify-between gap-x-2 gap-y-2 p-4 text-sm text-secondary">
          <span className="font-medium text-primary">{teacherLabel}</span>
          <span className="text-secondary">
            {formatDate(new Date(), 'EEEE, dd MMMM yyyy HH:mm')}
          </span>
        </Surface>

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v as Tab);
          }}
        >
          <Tabs.Item value="input" icon={<Plus size={16} />}>
            Isi Absensi
          </Tabs.Item>

          <Tabs.Item value="history" icon={<History size={16} />}>
            Riwayat
          </Tabs.Item>
        </Tabs>
      </PageLayout.Header>

      <PageLayout.Content>
        {activeTab === 'input' && (
          <AttendanceInputSection
            teacherId={teacherId}
            students={students}
            sessions={sessions}
            classes={classes}
          />
        )}
        {activeTab === 'history' && (
          <AttendanceHistorySection sessions={sessions} classes={classes} />
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};
