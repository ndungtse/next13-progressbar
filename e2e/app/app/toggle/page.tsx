'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Next13ProgressBar } from 'next13-progressbar';

export default function Toggle() {
  const [show, setShow] = useState(true);
  return (
    <main>
      <h1>toggle</h1>
      <button onClick={() => setShow(false)}>hide bar</button>
      <Link href="/slow">to slow</Link>
      {show && <Next13ProgressBar height={5} transformCSS={(css) => <style data-testid="custom-css">{css}</style>} />}
    </main>
  );
}
