'use client';

import { useState } from 'react';

import {
  Button,
  Card,
  EmptyState,
  Field,
  FieldValue,
  Tabs,
  PageLayout,
  Breadcrumb,
} from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

import { History, FileSpreadsheet, User } from 'lucide-react';

import type { TeacherDetailProfile } from '../get-teacher-detail';
import type { TeacherMonthlyReportRow } from '../get-teacher-detail-data';
import type { TeacherAttendanceSessionRow } from '../get-teacher-attendance-session-list';

import { SessionAttendanceTable } from './session-attendance-table';
import { MonthlyReportTable } from './monthly-report-table';

type TeacherDetailProps = {
  teacher: TeacherDetailProfile;
  sessionRows: TeacherAttendanceSessionRow[];
  monthlyReport: TeacherMonthlyReportRow[];
  basePath?: string;
};

export const TeacherDetail = ({
  teacher,
  sessionRows,
  monthlyReport,
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

      <Card title="Detail Guru" className="space-y-4">
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

  const renderAttendanceHistoryTab = () => {
    if (sessionRows.length === 0) {
      return (
        <EmptyState
          title="Belum ada riwayat"
          description="Riwayat absensi akan muncul setelah data absensi tersedia."
        />
      );
    }
    return <SessionAttendanceTable rows={sessionRows} />;
  };

  const renderMonthlyReportTab = () => {
    if (monthlyReport.length === 0) {
      return (
        <EmptyState
          title="Belum ada laporan"
          description="Laporan bulanan akan muncul setelah data absensi tersedia."
        />
      );
    }
    return <MonthlyReportTable rows={monthlyReport} />;
  };

  return (
    <PageLayout>
      <PageLayout.Header>
        <Breadcrumb
          items={[{ label: 'Laporan Absensi Guru', href: basePath }, { label: teacher.name }]}
        />
        <section>
          <h1 className="text-2xl font-semibold sm:text-3xl text-primary">Profil Guru</h1>
          <p className="mt-2 text-secondary">
            Lihat informasi detail dan riwayat absensi guru{' '}
            <span className="font-semibold">{teacher.name}</span>.
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
              Laporan Bulanan
            </Tabs.Item>
          </Tabs>
        </div>
      </PageLayout.Header>

      <PageLayout.Content>
        {activeTab === 'info' && renderInfoTab()}
        {activeTab === 'history' && renderAttendanceHistoryTab()}
        {activeTab === 'report' && renderMonthlyReportTab()}
      </PageLayout.Content>
    </PageLayout>
  );
};
