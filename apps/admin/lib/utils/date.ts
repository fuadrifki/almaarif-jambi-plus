import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date: Date, formatValue = 'EEEE, dd MMMM yyyy HH:mm'): string => {
  return format(date, formatValue, { locale: id });
};
