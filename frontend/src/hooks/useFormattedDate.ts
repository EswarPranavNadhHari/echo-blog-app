import { useMemo } from 'react';

export default function useFormattedDate() {
  const formattedDate = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  }, []);

  return formattedDate;
}
