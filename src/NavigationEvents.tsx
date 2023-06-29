'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNProgress } from './NProvider';

export function NavigationEvents() {
  const pathname = usePathname();
  const { setShowProgressBar } = useNProgress();

  useEffect(() => {
    setShowProgressBar(false);
  }, [pathname]);

  return null;
}
