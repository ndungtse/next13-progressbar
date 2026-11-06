'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next13-progressbar';

export default function RouterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [renders, setRenders] = useState(0);
  const effectRuns = useRef(0);

  useEffect(() => {
    effectRuns.current += 1;
    document.getElementById('effect-runs')!.textContent = String(effectRuns.current);
  }, [router]);

  return (
    <main>
      <h1>router</h1>
      <p id="query">query = {searchParams.toString()}</p>
      <p>
        renders = {renders}, router effect runs = <span id="effect-runs" />
      </p>
      <button onClick={() => setRenders((n) => n + 1)}>rerender</button>
      <button onClick={() => router.replace('/router?tab=2')}>replace ?tab=2</button>
      <button onClick={() => router.replace('/router')}>replace without query</button>
      <button onClick={() => router.replace('/slow')}>replace /slow</button>
      <button onClick={() => router.push('/slow')}>push /slow</button>
    </main>
  );
}
