import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib';

import { Button } from '../button';

import { getPaginationRange, getTotalPages } from './pagination.utils';

import type { PaginationProps } from './pagination.types';

export const Pagination = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  className,
  ...props
}: PaginationProps) => {
  const totalPages = getTotalPages(totalItems, pageSize);

  if (totalPages <= 1) return null;

  const items = getPaginationRange(page, totalPages);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, targetPage: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPageChange(targetPage);
    }
  };

  return (
    <nav
      className={cn('ads-pagination', className)}
      role="navigation"
      aria-label="Pagination"
      {...props}
    >
      <Button
        variant="ghost"
        size="sm"
        disabled={isFirst}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        onKeyDown={(e) => handleKeyDown(e, page - 1)}
        className="ads-pagination__nav"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </Button>

      {items.map((item) => {
        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
          return (
            <span key={item} className="ads-pagination__ellipsis" aria-hidden="true">
              <MoreHorizontal size={16} />
            </span>
          );
        }

        const isActive = item === page;

        return (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn('ads-pagination__item', isActive && 'ads-pagination__item--active')}
            onClick={() => onPageChange(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
          >
            {item}
          </button>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        disabled={isLast}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        onKeyDown={(e) => handleKeyDown(e, page + 1)}
        className="ads-pagination__nav"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </Button>
    </nav>
  );
};
