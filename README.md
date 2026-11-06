# Next.js 13 Progressbar

A simple Next.js progressbar component using [NProgress](http://ricostacruz.com/nprogress/) with support of next.js 13 and later app dir.

<!-- > [I've created this Blog to help you create your own progressbar](https://gosink.in/next-js-make-your-own-progress-bar-indicator-component-easily/) -->

**Demo**: [https://next13-progressbar.vercel.app/](https://next13-progressbar.vercel.app/)

## How to install?

```bash
npm i next13-progressbar
```

## How to use?

⚠️ **_Note_** : This docs are for versions `>=1.0.0` only. For the older versions check tags versions tree's Readme of the older version.

After installing the package, create `providers.tsx` file in app directory to handle contexts and mark it `use client`. see [contexts in app dir](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers) and import `Next13ProgressBar;

```jsx
'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} />
    </>
  );
};

export default Providers;
```

Wrap your providers in `layout.tsx/js`

```jsx
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

The package is marked `'use client'`, so you can also render `<Next13ProgressBar />` directly in `layout.tsx` without a providers file.

By default all `a` tags are handled by `next/link` so you don't need to do anything.

For programmatic navigation, use `useRouter` from this package instead of `next/navigation`. Its `push` and `replace` navigate exactly like Next's; they also show the bar when the URL changes.

```jsx
import Link from 'next/link';
import { useRouter } from 'next13-progressbar';

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="navbar">
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/contact'}>Contact</Link>
      <button onClick={() => router.push('/button-link')}>ButtonLink</button>
    </div>
  );
};
```

### Default Config

If no props are passed to `<Next13ProgressBar />`, below is the default configuration applied.

```jsx
<Next13ProgressBar color="#0A2FFF" height="2px" delay={0} />
```

- `color`: to change the default color of progressbar. You can also use `rgb(,,)` or `rgba(,,,)`.
- `delay`: time for delay to start progressbar in `ms`.
- `height`: height of progressbar. A number is in `px` (`height={3}`); a string is used as is (`height="0.25rem"`).
- `options`: [NProgress options](https://github.com/rstacruz/nprogress#configuration), e.g. `{ showSpinner: false, minimum: 0.3 }`.

`startPosition`, `stopDelayMs` and `showOnShallow` are deprecated and have no effect. Use `options={{ minimum: 0.3 }}` in place of `startPosition`.

### Advanced Config

#### Adding nonce

We use internal css in this package. If you are using csp, you can add nonce to the `<style>` tag by providing `nonce` prop to `<Next13ProgressBar />` component.

```jsx
<Next13ProgressBar nonce="my-nonce" />
```

#### Custom CSS

You can pass custom css to the progressbar by using `style` prop.

```jsx
<Next13ProgressBar
  style={`
    #nprogress {
      pointer-events: none;
    }
  `}
/>
```

#### Custom style tag

`transformCSS` receives the CSS and returns the element that renders it, in place of the default `<style>` tag.

```jsx
<Next13ProgressBar transformCSS={(css) => <style data-progressbar>{css}</style>} />
```

### Older Versions

Check Branches with `v` prefix for older docs of the package.
If not found check tags versions tree's Readme of the older version.

## Contributing

Any Contribution of any kind are appreciated. You can start by forking this repository and make your changes then submit a pull request

## Author

- [Ndungutse Charles](https://github.com/NdungutseCharles103)

## Support

Your support matters. It pushes me to do more Open Source contributions and give back to the community.
<a href="https://www.buymeacoffee.com/ndungutse" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
