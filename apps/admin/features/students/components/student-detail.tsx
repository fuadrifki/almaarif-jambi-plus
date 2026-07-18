'use client';
import { useState } from 'react';

import {
  Button,
  Card,
  Field,
  FieldValue,
  Surface,
  Tabs,
  EmptyState,
  PageLayout,
  Breadcrumb,
} from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

import { History, FileSpreadsheet, User } from 'lucide-react';
import type { Student } from '../types';

import { Class } from '@/features/classes';

type StudentDetailProps = {
  student: Student;
  classData: Class | null;
};

export const StudentDetail = ({ student, classData }: StudentDetailProps) => {
  const [activeTab, setActiveTab] = useState('info');

  const renderInfoTab = () => (
    <div className="space-y-4">
      <Card title="Foto Siswa">
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <div className="relative shrink-0">
            {student.photoUrl ? (
              <Surface className="rounded-full!">
                <Card className="flex w-max h-max items-center justify-center rounded-full! text-sm font-semibold text-primary p-0">
                  <Image
                    src={student.photoUrl}
                    alt="Foto siswa"
                    width={160}
                    height={160}
                    className="h-40 h-40 rounded-full object-cover"
                  />
                </Card>
              </Surface>
            ) : (
              <Surface className="rounded-full!">
                <Card className="flex h-40 w-40 items-center justify-center rounded-full text-6xl font-semibold text-secondary">
                  {student?.name?.charAt(0)?.toUpperCase() ?? '?'}
                </Card>
              </Surface>
            )}
          </div>
        </div>
      </Card>

      <Card title="Detail Siswa">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="NIS">
            <FieldValue>{student.nis}</FieldValue>
          </Field>
          <Field label="Nama Siswa">
            <FieldValue>{student.name}</FieldValue>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Kelas">
            <FieldValue>{classData?.name}</FieldValue>
          </Field>

          <Field label="Kamar">
            <FieldValue>{student?.room}</FieldValue>
          </Field>
        </div>
      </Card>

      <Card title="Detail Wali">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nama Wali">
            <FieldValue>{student.guardianName}</FieldValue>
          </Field>
          <Field label="Telepon Wali">
            <FieldValue>{student.guardianPhone}</FieldValue>
          </Field>
        </div>
        <Field label="Alamat">
          <FieldValue>{student.address}</FieldValue>
        </Field>
      </Card>

      <div className="flex gap-3 pt-2 items-center justify-center sm:justify-end">
        <Link href={`/students`} className="w-full sm:w-max">
          <Button type="button" variant="ghost">
            Kembali
          </Button>
        </Link>

        <Link href={`/students/${student.id}/edit`} className="w-full sm:w-max">
          <Button type="submit" className="w-full">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderAttendanceHistoryTab = () => (
    <EmptyState
      icon={<History size={32} />}
      title="Belum ada riwayat absensi"
      description="Fitur riwayat absensi akan tersedia pada milestone berikutnya."
    />
  );

  const renderAttendanceReportTab = () => (
    <EmptyState
      icon={<FileSpreadsheet size={32} />}
      title="Belum ada laporan absensi"
      description="Fitur laporan absensi akan tersedia pada milestone berikutnya."
    />
  );

  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb items={[{ label: 'Students', href: '/students' }, { label: student.name }]} />
        <section>
          <h1 className="text-2xl font-semibold sm:text-3xl text-primary">Student Profile</h1>

          <p className="mt-2 text-secondary">
            View the detailed information of student {student.name}.
          </p>
        </section>

        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <Tabs.Item value="info" icon={<User size={16} />}>
              Info
            </Tabs.Item>
            <Tabs.Item value="history" icon={<History size={16} />}>
              Riwayat Absensi
            </Tabs.Item>
            <Tabs.Item value="report" icon={<FileSpreadsheet size={16} />}>
              Laporan Absensi
            </Tabs.Item>
          </Tabs>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        {activeTab === 'info' && renderInfoTab()}
        {activeTab === 'history' && renderAttendanceHistoryTab()}
        {activeTab === 'report' && renderAttendanceReportTab()}
      </PageLayout.Content>
    </PageLayout>
  );
};
