import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  return format(date, 'd MMMM yyyy, HH:mm', { locale: id });
};
