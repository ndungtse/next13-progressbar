// A server component: rendering the bar here needs the package to be marked 'use client'.
import { Next13ProgressBar } from 'next13-progressbar';

export default function BarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Next13ProgressBar color="#ff0000" nonce="test-nonce" />
    </>
  );
}
