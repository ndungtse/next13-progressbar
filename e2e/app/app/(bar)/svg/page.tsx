import Link from 'next/link';

export default function Svg() {
  return (
    <main>
      <h1>svg</h1>
      <svg width="200" height="40">
        <a href="/slow">
          <text x="0" y="20">
            svg anchor
          </text>
        </a>
      </svg>
      <Link href="/slow">html link to slow</Link>
    </main>
  );
}
