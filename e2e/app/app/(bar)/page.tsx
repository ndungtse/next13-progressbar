import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>home</h1>
      <Link href="/slow">to slow</Link>
      <Link href="/svg">to svg</Link>
      <Link href="/links">to links</Link>
      <Link href="/router">to router</Link>
    </main>
  );
}
