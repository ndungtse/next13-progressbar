'use client';
import React from 'react';
import { NProvider } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NProvider color="#fff">{children}</NProvider>;
};

export default Providers;
