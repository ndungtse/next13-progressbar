import React, { useEffect, useMemo } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams, useRouter as useNextRouter } from 'next/navigation';
import { Next13ProgressProps } from '.';

type AppRouter = ReturnType<typeof useNextRouter>;
type NavigateOptions = Parameters<AppRouter['push']>[1];
type HistoryMethod = typeof window.history.pushState;

/** Same page and same query: Next won't change pathname/searchParams, so a started bar would never finish. */
function isSameUrl(target: URL) {
  return (
    target.origin === location.origin && target.pathname === location.pathname && target.search === location.search
  );
}

export const Next13ProgressBar = React.memo(
  ({ color = '#0A2FFF', height = '2px', options, delay = 0, style }: Next13ProgressProps) => {
    const styles = (
      <style>
        {style ||
          `
          #nprogress {
            pointer-events: none;
          }
          
          #nprogress .bar {
            background: ${color};
          
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
          
            width: 100%;
            height: ${height};
          }
          
          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
            opacity: 1.0;
          
            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }
          
          /* Remove these to get rid of the spinner */
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }
          
          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;
          
            border: solid 2px transparent;
            border-top-color: ${color};
            border-left-color: ${color};
            border-radius: 50%;
          
            -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
          }
          
          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }
          
          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }
          
          @-webkit-keyframes nprogress-spinner {
            0%   { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          @keyframes nprogress-spinner {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    );

    NProgress.configure(options || {});

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      NProgress.done();
    }, [pathname, searchParams]);

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      let mounted = true;

      const startProgress = () => {
        timer = setTimeout(NProgress.start, delay);
      };

      const stopProgress = () => {
        clearTimeout(timer);
        NProgress.done();
      };

      const handleClick = (event: MouseEvent) => {
        // detect ctrl/cmd option/alt shift click
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        // SVG <a> elements have no string href and aren't Next.js links
        const anchor = (event.target as Element | null)?.closest?.('a');
        if (!(anchor instanceof HTMLAnchorElement) || !anchor.hasAttribute('href')) return;

        // Skip anchors with target attribute but different than _self
        if (anchor.target.trim() !== '' && anchor.target !== '_self') return;

        // Skip anchors with download attribute
        if (anchor.hasAttribute('download')) return;

        // Skip mailto:, tel:, sms:, javascript: and other non-page links
        const targetUrl = new URL(anchor.href);
        if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') return;

        if (isSameUrl(targetUrl)) return;

        startProgress();
      };

      document.addEventListener('click', handleClick, true);

      const stopOn = (method: HistoryMethod) =>
        new Proxy(method, {
          apply: (target, thisArg, argArray: Parameters<HistoryMethod>) => {
            if (mounted) stopProgress();
            return target.apply(thisArg, argArray);
          },
        });

      const { pushState, replaceState } = window.history;
      const pushStateProxy = stopOn(pushState);
      const replaceStateProxy = stopOn(replaceState);
      window.history.pushState = pushStateProxy;
      window.history.replaceState = replaceStateProxy;

      return () => {
        mounted = false;
        stopProgress();
        document.removeEventListener('click', handleClick, true);
        // Next.js wraps history methods too; only restore the ones that are still ours.
        if (window.history.pushState === pushStateProxy) window.history.pushState = pushState;
        if (window.history.replaceState === replaceStateProxy) window.history.replaceState = replaceState;
      };
    }, [delay]);

    return styles;
  },
  () => true
);

export function useRouter(): AppRouter {
  const router = useNextRouter();

  return useMemo(() => {
    // Always let Next navigate; only decide whether to show the bar.
    function push(href: string, options?: NavigateOptions) {
      if (!isSameUrl(new URL(href, location.href))) NProgress.start();
      return router.push(href, options);
    }

    function replace(href: string, options?: NavigateOptions) {
      if (!isSameUrl(new URL(href, location.href))) NProgress.start();
      return router.replace(href, options);
    }

    return { ...router, push, replace };
  }, [router]);
}
