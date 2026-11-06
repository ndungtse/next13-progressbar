import { Suspense } from 'react';
import RouterButtons from './RouterButtons';

export default function RouterPage() {
  return (
    <Suspense>
      <RouterButtons />
    </Suspense>
  );
}
