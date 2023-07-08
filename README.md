# Next.js 13 Progressbar

A simple Next.js progressbar component using [NProgress](http://ricostacruz.com/nprogress/) with support of next.js 13 app dir.

<!-- > [I've created this Blog to help you create your own progressbar](https://gosink.in/next-js-make-your-own-progress-bar-indicator-component-easily/) -->

**Demo**: [https://demo-next13-progressbar.vercel.app](https://demo-next13-progressbar.vercel.app/)

## How to install?

```bash
npm i next13-progressbar
```

## How to use?

After installing the package, create `providers.tsx` file in app directory to handle contexts and mark it `use client`. see [contexts in app dir](https://nextjs.org/docs/getting-started/react-essentials#context) and import `NProvider;

```jsx
'use client';
import React from 'react';
import { NProvider } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NProvider color="#fff">{children}</NProvider>;
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

By default all `a` tags are handled by `next/link` so you don't need to do anything.

```jsx
import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="navbar">
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/contact'}>Contact</Link>
    </div>
  );
}
```

But if you want to use `Link` component from `next13-progressbar` you can do it by importing it from `next13-progressbar` and use it as you would use `next/link` component.

```jsx
'use client';
import { Link } from 'next13-progressbar';

// use it as you would use next/link
```

And you are done. You can now customize you progress bar as you need!

⚠️ Note: You must use `next13-progressbar` `Link` component inside client components only.

### Default Config

If no props are passed to `<NProvider />`, below is the default configuration applied.

```jsx
<NProvider color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
```

- `color`: to change the default color of progressbar. You can also use `rgb(,,)` or `rgba(,,,)`.
- `startPosition`: to set the default starting position : `0.3 = 30%`.
- `stopDelayMs`: time for delay to stop progressbar in `ms`.
- `height`: height of progressbar in `px`.
- `showOnShallow`: You can choose whether you want the progressbar to be displayed if you're using shallow routing. It takes a boolean. Learn more about shallow routing [in Next.js docs](https://nextjs.org/docs/routing/shallow-routing).

### Advanced Config

#### Adding nonce

We use internal css in this package. If you are using csp, you can add nonce to the `<style>` tag by providing `nonce` prop to `<NProvider />` component.

```jsx
<NProvider nonce="my-nonce" />
```

#### Custom CSS

You can use `transformCSS` prop to pass custom css.
**Note:** You must return a `JSX.Element` from the function.

```jsx
<NProvider
  transformCSS={(css) => {
    // css is the default css string. You can modify it and return it or return your own css.
    return <style>{css}</style>;
  }}
/>
```

#### Other Configs

You can use [other configurations](https://github.com/rstacruz/nprogress#configuration) which NProgress provides by adding a JSON in `options` props.

```jsx
<NProvider options={{ easing: 'ease', speed: 500 }} />
```

## Contributing

Any Contribution of any kind are appreciated. You can start by forking this repository and make your changes then submit a pull request

## Author

- [Ndungutse Charles](https://github.com/NdungutseCharles103)
