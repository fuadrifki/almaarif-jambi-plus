import { Surface } from '../surface';

import { cn } from '@/lib';

import type {
  TableBodyProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from './table.types';

export const Table = ({ className, maxHeight, children, ...props }: TableProps) => (
  <Surface className={cn('ads-table', className)}>
    <div
      className="ads-table__scroll"
      style={
        maxHeight
          ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
          : undefined
      }
    >
      <table className="ads-table__table" {...props}>
        {children}
      </table>
    </div>
  </Surface>
);

export const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead className={cn('ads-table__header', className)} {...props} />
);

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody className={cn('ads-table__body', className)} {...props} />
);

export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot className={cn('ads-table__footer', className)} {...props} />
);

export const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr className={cn('ads-table__row', className)} {...props} />
);

export const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th className={cn('ads-table__head', className)} {...props} />
);

export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td className={cn('ads-table__cell', className)} {...props} />
);
