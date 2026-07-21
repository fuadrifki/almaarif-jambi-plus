'use client';

import { useState } from 'react';

import { Button, Field, Select, SelectOption, Textarea } from '@/components/ui';

import { ATTENDANCE_STATUS, ATTENDANCE_STATUS_OPTIONS, Schedule } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type AttendanceFilterInputProps = {
  classes: SelectOption[];
  classId: number;
  subjectsByClass: SelectOption[];
  subjectId: number;
  isSubstituteMode: boolean;
  originalTeacherStatus: string;
  substituteNotes: string;
  onSelectClass: (classId: number) => void;
  onSelectSubject: (subjectId: number) => void;
  onSelectOriginalTeacherStatus: (status: string) => void;
  onChangeSubstituteNotes: (notes: string) => void;
  handleSubstituteConfirmed: () => void;
  onReset: () => void;
};

export const AttendanceFilterInput = ({
  classes,
  classId,
  subjectsByClass,
  subjectId,
  isSubstituteMode,
  originalTeacherStatus,
  substituteNotes,
  onSelectClass,
  onSelectSubject,
  onSelectOriginalTeacherStatus,
  onChangeSubstituteNotes,
  handleSubstituteConfirmed,
  onReset,
}: AttendanceFilterInputProps) => {
  const [openTeacherSubstitute, setOpenTeacherSubstitute] = useState(false);

  const isValidSelected = [classId, subjectId].every(Boolean);

  const isValidSubstituteMode = [
    isValidSelected,
    originalTeacherStatus,
    originalTeacherStatus !== ATTENDANCE_STATUS.PERMISSION || substituteNotes,
  ].every(Boolean);

  const disabledDetailOriginalTeacher = [
    !isSubstituteMode && !isValidSelected,
    isSubstituteMode && !isValidSubstituteMode,
  ].some(Boolean);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center">
      <Select
        options={classes}
        value={classId}
        placeholder="Kelas"
        onChange={(value) => {
          onSelectClass(Number(value));
        }}
      />

      <Select
        options={subjectsByClass}
        value={subjectId}
        placeholder="Mata pelajaran"
        onChange={(value) => {
          onSelectSubject(Number(value));
        }}
        disabled={!classId}
      />

      {isSubstituteMode && (
        <Popover open={openTeacherSubstitute} onOpenChange={setOpenTeacherSubstitute}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Keterangan guru asli
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 space-y-4">
            <div className="space-y-3">
              <Field label="Status berhalangan" required>
                <Select
                  options={ATTENDANCE_STATUS_OPTIONS.slice(1)}
                  value={originalTeacherStatus}
                  placeholder="Pilih"
                  onChange={(value) => {
                    onSelectOriginalTeacherStatus(String(value));
                  }}
                />
              </Field>

              {originalTeacherStatus === ATTENDANCE_STATUS.PERMISSION && (
                <Field label="Keterangan" required>
                  <Textarea
                    placeholder="Alasan guru asli berhalangan"
                    value={substituteNotes}
                    onChange={(e) => {
                      const value = String(e.target.value);
                      onChangeSubstituteNotes(value);
                    }}
                    size="sm"
                    resize="none"
                    rows={2}
                  />
                </Field>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <Button
                onClick={() => {
                  handleSubstituteConfirmed();
                  setOpenTeacherSubstitute(false);
                }}
                disabled={disabledDetailOriginalTeacher}
              >
                Simpan
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
