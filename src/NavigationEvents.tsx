'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from './NProvider';

export function NavigationEvents() {
  const pathname = usePathname();
  const { setShowProgressBar } = useApp();

  useEffect(() => {
    setShowProgressBar(false);
  }, [pathname]);

  return null;
}
