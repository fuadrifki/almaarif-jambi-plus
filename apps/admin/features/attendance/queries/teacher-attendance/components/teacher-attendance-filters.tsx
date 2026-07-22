'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { format, parseISO, subMonths } from 'date-fns';

import { Badge, Button, Input, Select, DatePicker, Card } from '@/components/ui';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Search } from 'lucide-react';
import {
  TEACHING_ROLE_OPTIONS,
  ATTENDANCE_SESSION_STATUS_OPTIONS,
} from '@/features/attendance/types';

type TeacherAttendanceFiltersProps = {
  teachers: { id: number; name: string }[];
  classes: { id: number; name: string }[];
  subjects: { id: number; label: string }[];
};

function generateMonthOptions() {
  const now = new Date();
  const options: { label: string; value: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const date = subMonths(now, i);
    const value = format(date, 'yyyy-MM');
    const label = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    options.push({ label, value });
  }
  return options;
}

export const TeacherAttendanceFilters = ({
  teachers,
  classes,
  subjects,
}: TeacherAttendanceFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const q = searchParams.get('search') || '';
  const dateParam = searchParams.get('date') || '';
  const monthParam = searchParams.get('month') || '';
  const teacherId = searchParams.get('teacherId') || '';
  const classId = searchParams.get('classId') || '';
  const subjectId = searchParams.get('subjectId') || '';
  const attendanceStatus = searchParams.get('attendanceStatus') || '';
  const teachingRole = searchParams.get('teachingRole') || '';

  const advancedFilterCount = [
    dateParam,
    monthParam,
    teacherId,
    classId,
    subjectId,
    attendanceStatus,
    teachingRole,
  ].filter(Boolean).length;

  const monthOptions = useMemo(() => generateMonthOptions(), []);

  const datePickerValue = useMemo(() => {
    if (!dateParam) return undefined;
    try {
      return parseISO(dateParam);
    } catch {
      return undefined;
    }
  }, [dateParam]);

  const teacherOptions = useMemo(
    () => [
      { label: 'Semua', value: '' },
      ...teachers
        .map((t) => ({ label: t.name, value: t.id }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ],
    [teachers],
  );

  const classOptions = useMemo(
    () => [
      { label: 'Semua', value: '' },
      ...classes
        .map((c) => ({ label: c.name, value: c.id }))
        .sort((a, b) => String(a.label).localeCompare(String(b.label))),
    ],
    [classes],
  );

  const subjectOptions = useMemo(
    () => [
      { label: 'Semua', value: '' },
      ...subjects
        .map((s) => ({ label: s.label, value: s.id }))
        .sort((a, b) => String(a.label).localeCompare(String(b.label))),
    ],
    [subjects],
  );

  const attendanceStatusOptions = useMemo(
    () => [{ label: 'Semua', value: '' }, ...ATTENDANCE_SESSION_STATUS_OPTIONS],
    [],
  );

  const teachingRoleOptions = useMemo(
    () => [{ label: 'Semua', value: '' }, ...TEACHING_ROLE_OPTIONS],
    [],
  );

  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      if (params.toString() === searchParams.toString()) {
        return;
      }

      router.push(`${pathname}?${params}`, { scroll: false });
    },
    [pathname, searchParams, router],
  );

  const handleDateChange = (date: Date | undefined) => {
    updateSearchParams({
      date: date ? format(date, 'yyyy-MM-dd') : undefined,
      month: undefined,
    });
  };

  const handleMonthChange = (value: string | number) => {
    updateSearchParams({
      month: String(value) || undefined,
      date: undefined,
    });
  };

  const handleTeacherChange = (value: string | number) => {
    updateSearchParams({ teacherId: String(value) || undefined });
  };

  const handleClassChange = (value: string | number) => {
    updateSearchParams({ classId: String(value) || undefined });
  };

  const handleSubjectChange = (value: string | number) => {
    updateSearchParams({ subjectId: String(value) || undefined });
  };

  const handleAttendanceStatusChange = (value: string | number) => {
    updateSearchParams({ attendanceStatus: String(value) || undefined });
  };

  const handleTeachingRoleChange = (value: string | number) => {
    updateSearchParams({ teachingRole: String(value) || undefined });
  };

  const [search, setSearch] = useState(q);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearchParams({ search: String(search) || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, updateSearchParams]);

  const handleReset = () => {
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsPopoverOpen(false);
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          placeholder="Cari nama guru..."
          leftIcon={<Search size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3"
        />

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Filter
              {advancedFilterCount > 0 && <Badge variant="info">{advancedFilterCount}</Badge>}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-full sm:w-80 p-0"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="flex flex-col h-full w-full">
              <div className="px-4 py-3 border-b border-border flex items-center gap-3 justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>

                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>

              <div className="px-4 py-4 space-y-4 overflow-y-auto flex-1 w-full">
                <div>
                  <p className="text-sm text-secondary mb-1.5">Tanggal</p>
                  <DatePicker
                    value={datePickerValue}
                    onChange={handleDateChange}
                    placeholder="Pilih tanggal"
                    resettable
                  />
                </div>

                <div>
                  <p className="text-sm text-secondary mb-1.5">Bulan</p>
                  <Select
                    options={monthOptions}
                    value={monthParam}
                    placeholder="Pilih bulan"
                    onChange={handleMonthChange}
                  />
                </div>

                <Select
                  options={teacherOptions}
                  value={teacherId}
                  placeholder="Guru"
                  onChange={handleTeacherChange}
                />

                <Select
                  options={classOptions}
                  value={classId}
                  placeholder="Kelas"
                  onChange={handleClassChange}
                />

                <Select
                  options={subjectOptions}
                  value={subjectId}
                  placeholder="Mata Pelajaran"
                  onChange={handleSubjectChange}
                />

                <Select
                  options={attendanceStatusOptions}
                  value={attendanceStatus}
                  placeholder="Status Absensi"
                  onChange={handleAttendanceStatusChange}
                />

                <Select
                  options={teachingRoleOptions}
                  value={teachingRole}
                  placeholder="Peran Mengajar"
                  onChange={handleTeachingRoleChange}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};
