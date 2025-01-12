import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export const parseDate = (dateString) => {
  return parseISO(dateString);
};

export const formatDate = (isoDate) => {
  return format(new Date(isoDate), 'dd MMMM yyyy', { locale: id });
};
