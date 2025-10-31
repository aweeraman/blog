import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use both instant scroll and a small delay to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Backup scroll after a small delay to ensure DOM has updated
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
  }, [pathname]);

  return null;
}
