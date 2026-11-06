export const dynamic = 'force-dynamic';

export default async function Slow() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return <h1>slow</h1>;
}
