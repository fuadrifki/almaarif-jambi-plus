'use client';

import { useState } from 'react';

import { Button, Card, Field, FieldValue, Tabs, PageLayout, Breadcrumb } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

import { History, FileSpreadsheet, User } from 'lucide-react';
import type { TeacherAttendanceRow, TeacherAttendanceSummary } from '../types';
import { TeacherAttendanceHistoryTab } from './teacher-attendance-history-tab';
import { TeacherAttendanceReportTab } from './teacher-attendance-report-tab';

type TeacherDetailProps = {
  teacher: {
    id: number;
    code: string;
    name: string;
    email: string;
    photo: string;
    birthPlace: string;
    birthDate: string;
    address: string;
    phone: string;
    formalEducation: string;
    boardingEducation: string;
    position: string;
  };
  history: TeacherAttendanceRow[];
  report: {
    month: string;
    hadir: number;
    pengganti: number;
    tidakHadir: number;
    total: number;
  }[];
  summary: TeacherAttendanceSummary;
  basePath?: string;
};

export const TeacherDetail = ({
  teacher,
  history,
  report,
  summary,
  basePath = '/dashboard/attendance/teachers',
}: TeacherDetailProps) => {
  const [activeTab, setActiveTab] = useState('info');

  const renderInfoTab = () => (
    <div className="space-y-4">
      <Card title="Foto Guru">
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <div className="relative shrink-0">
            {teacher.photo ? (
              <Card
                noPadding
                className="flex w-max h-max items-center justify-center rounded-full! text-sm font-semibold text-primary p-0"
              >
                <Image
                  src={teacher.photo}
                  alt="Foto guru"
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover"
                />
              </Card>
            ) : (
              <Card
                noPadding
                className="flex h-40 w-40 items-center justify-center rounded-full! text-6xl font-semibold text-secondary"
              >
                {teacher?.name?.charAt(0)?.toUpperCase() ?? '?'}
              </Card>
            )}
          </div>
        </div>
      </Card>

      <Card title="Detail Guru">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Kode">
            <FieldValue>{teacher.code}</FieldValue>
          </Field>
          <Field label="Nama Guru">
            <FieldValue>{teacher.name}</FieldValue>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email">
            <FieldValue>{teacher.email}</FieldValue>
          </Field>
          <Field label="Jabatan">
            <FieldValue>{teacher.position}</FieldValue>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Tempat Lahir">
            <FieldValue>{teacher.birthPlace}</FieldValue>
          </Field>
          <Field label="Tanggal Lahir">
            <FieldValue>{teacher.birthDate}</FieldValue>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Telepon">
            <FieldValue>{teacher.phone}</FieldValue>
          </Field>
          <Field label="Pendidikan Formal">
            <FieldValue>{teacher.formalEducation}</FieldValue>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Pendidikan Pesantren">
            <FieldValue>{teacher.boardingEducation}</FieldValue>
          </Field>
        </div>

        <Field label="Alamat">
          <FieldValue>{teacher.address}</FieldValue>
        </Field>
      </Card>

      <div className="flex gap-3 pt-2 items-center justify-center sm:justify-end">
        <Link href={basePath} className="w-full sm:w-max">
          <Button type="button" variant="ghost">
            Kembali
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderAttendanceHistoryTab = () => <TeacherAttendanceHistoryTab rows={history} />;

  const renderAttendanceReportTab = () => <TeacherAttendanceReportTab rows={report} />;

  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb
          items={[{ label: 'Laporan Absensi Guru', href: basePath }, { label: teacher.name }]}
        />
        <section>
          <h1 className="text-2xl font-semibold sm:text-3xl text-primary">Profil Guru</h1>

          <p className="mt-2 text-secondary">
            Lihat informasi detail dan riwayat absensi guru {teacher.name}.
          </p>
        </section>

        <Card className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-xs text-secondary uppercase">Kode</p>
            <p className="font-medium text-primary">{teacher.code}</p>
          </div>
          <div>
            <p className="text-xs text-secondary uppercase">Jabatan</p>
            <p className="font-medium text-primary">{teacher.position}</p>
          </div>
          <div>
            <p className="text-xs text-secondary uppercase">Total Kehadiran</p>
            <p className="font-medium text-primary">{summary.totalTeaching}</p>
          </div>
          <div>
            <p className="text-xs text-secondary uppercase">Total Pengganti</p>
            <p className="font-medium text-primary">{summary.substituteCount}</p>
          </div>
        </Card>

        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <Tabs.Item value="info" icon={<User size={16} />}>
              Info
            </Tabs.Item>
            <Tabs.Item value="history" icon={<History size={16} />}>
              Riwayat Absensi
            </Tabs.Item>
            <Tabs.Item value="report" icon={<FileSpreadsheet size={16} />}>
              Laporan Bulanan
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
