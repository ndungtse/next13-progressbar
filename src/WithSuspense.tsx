import React from 'react';
// HOC for suspense
export default function withSuspense(Component: React.FC) {
  return function WithSuspenseComponent(props: any) {
    return (
      <React.Suspense>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
