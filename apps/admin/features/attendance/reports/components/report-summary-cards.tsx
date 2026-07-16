import { cn } from '@/lib';
import { Badge, Card } from '@/components/ui';
import { ReportSummary } from '../../queries/types';

type ReportSummaryCardsProps = {
  summary: ReportSummary | null;
  className?: string;
};

export const ReportSummaryCards = ({ summary, className }: ReportSummaryCardsProps) => {
  if (!summary) {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 bg-surface animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Total',
      value: `${summary.totalStudents} Siswa`,
      variant: 'info' as const,
      className: 'text-blue-500',
    },
    {
      label: 'Hadir',
      value: `${summary.present} Siswa`,
      variant: 'success' as const,
      className: 'text-green-500',
    },
    {
      label: 'Sakit',
      value: `${summary.sick} Siswa`,
      variant: 'warning' as const,
      className: 'text-yellow-500',
    },
    {
      label: 'Izin',
      value: `${summary.permission} Siswa`,
      variant: 'info' as const,
      className: 'text-blue-500',
    },
    {
      label: 'Alpha',
      value: `${summary.absent} Siswa`,
      variant: 'danger' as const,
      className: 'text-red-500',
    },
    {
      label: 'Belum Absen',
      value: `${summary.notAttended} Siswa`,
      variant: 'default' as const,
      className: 'text-gray-500',
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4', className)}>
      {cards.map((card) => (
        <Card key={card.label} title={card.label}>
          <div className="flex flex-col gap-2">
            <p className={cn('text-xl md:text-2xl font-bold', card.className)}>{card.value}</p>
            <div className="flex items-center gap-2">
              <Badge variant={card.variant} className="text-xs">
                {card.value ? '✓' : '—'}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
