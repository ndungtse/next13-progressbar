'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useApp } from './NProvider';

export interface PLinkProps extends LinkProps {
  children: React.ReactNode;
}

/**
 * @param {PLinkProps} props
 * @description A link component that extends nextjs link component to provide progress
 */
export const CLink = (props: PLinkProps) => {
  const pathname = usePathname();
  const { setShowProgressBar } = useApp();

  const handleShowProgressBar = () => {
    if (pathname !== props.href) {
      setShowProgressBar(true);
    }
  };

  return (
    <Link onClick={handleShowProgressBar} {...props}>
      {props.children}
    </Link>
  );
};
