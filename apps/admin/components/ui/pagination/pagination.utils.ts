export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

const ELLIPSIS_THRESHOLD = 7;

const range = (start: number, end: number): number[] => {
  const result: number[] = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

export const getPaginationRange = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 0) return [];

  if (totalPages <= ELLIPSIS_THRESHOLD) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - 1, 1);
  const rightSibling = Math.min(currentPage + 1, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = Math.max(3, currentPage + 1);
    const leftRange = range(1, leftCount);

    return [...leftRange, 'ellipsis-end', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = Math.max(3, totalPages - currentPage + 2);
    const rightRange = range(totalPages - rightCount + 1, totalPages);

    return [1, 'ellipsis-start', ...rightRange];
  }

  const middleRange = range(leftSibling, rightSibling);

  return [1, 'ellipsis-start', ...middleRange, 'ellipsis-end', totalPages];
};

export const getTotalPages = (totalItems: number, pageSize: number): number => {
  if (pageSize <= 0) return 0;

  return Math.ceil(totalItems / pageSize);
};
