import { Card } from '@/components/ui';
import { TeacherAttendanceSummary } from '../types';
import { cn } from '@/lib';

export const TeacherSummaryCards = ({ summary }: { summary: TeacherAttendanceSummary }) => {
  const CARDS = [
    {
      key: 'totalClasses' as const,
      label: 'Total Kelas',
      valueKey: 'totalClasses' as const,
      className: 'text-green-500',
    },
    {
      key: 'totalSubjects' as const,
      label: 'Total Mata Pelajaran',
      valueKey: 'totalSubjects' as const,
      className: 'text-yellow-500',
    },
    {
      key: 'totalAttendanceSessions' as const,
      label: 'Total Hadir',
      valueKey: 'totalAttendanceSessions' as const,
      className: 'text-blue-500',
    },
    {
      key: 'substituteCount' as const,
      label: 'Total Pengganti',
      valueKey: 'substituteCount' as const,
      className: 'text-red-500',
    },
  ];
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4')}>
      {CARDS.map((card) => (
        <Card key={card.key} title={card.label} className={cn(card.className)}>
          <div className="flex flex-col gap-1">
            <p className={cn('text-xl md:text-2xl font-bold')}>{summary[card.valueKey]}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
