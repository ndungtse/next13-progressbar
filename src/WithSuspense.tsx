import React from 'react';
// HOC for suspense
export default function withSuspense<T = any>(Component: React.ComponentType<T>) {
  return function WithSuspenseComponent(props: T & React.JSX.IntrinsicAttributes) {
    return (
      <React.Suspense>
        <Component {...props} />
      </React.Suspense>
    );
  };
}
