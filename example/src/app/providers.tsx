'use client';

import { Next13ProgressBar } from '../../../dist';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
    </>
  );
};

export default Providers;
