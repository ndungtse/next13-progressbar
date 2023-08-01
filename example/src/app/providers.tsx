'use client';

// use this for local testing
// import { Next13ProgressBar } from '../../../dist';

// this for deploying example
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
    </>
  );
};

export default Providers;
