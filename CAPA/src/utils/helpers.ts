import dayjs from 'dayjs';
import type { Severity } from '../types';

export const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  return dayjs(dateStr).format('MMM DD, YYYY');
};

export const getSeverityColor = (severity: Severity): string => {
  const map: Record<Severity, string> = {
    Critical: 'red',
    High: 'orange',
    Medium: 'gold',
    Low: 'green',
  };
  return map[severity] || 'default';
};

export const today = (): string => dayjs().format('YYYY-MM-DD');