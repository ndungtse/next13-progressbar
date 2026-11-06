import type { JSX } from 'react';
import * as NProgress from 'nprogress';
import { Next13ProgressBar as ProgressBar, useRouter } from './AppProgressBar';
import withSuspense from './WithSuspense';

export interface Next13ProgressProps {
  /**
   * The color of the bar.
   * @default "#0A2FFF"
   */
  color?: string;
  /**
   * @deprecated Has no effect. Use `options={{ minimum: 0.3 }}` to set where the bar starts.
   */
  startPosition?: number;
  /**
   * The delay in milliseconds.
   * @default 0
   */
  delay?: number;
  /**
   * @deprecated Has no effect.
   */
  stopDelayMs?: number;
  /**
   * The height of the bar. Numbers are in pixels.
   * @default "2px"
   */
  height?: number | string;
  /**
   * @deprecated Has no effect. The app router has no shallow routing, and the bar is never shown for
   * navigations to the current URL because nothing would finish it.
   */
  showOnShallow?: boolean;
  /**
   * The other NProgress configuration options to pass to NProgress.
   * @default null
   */
  options?: Partial<NProgress.NProgressOptions>;
  /**
   * The nonce attribute to use for the `style` tag.
   * @default undefined
   */
  nonce?: string;

  /**
   * Use your custom CSS tag instead of the default one.
   * This is useful if you want to use a different style or minify the CSS.
   * @default (css) => <style nonce={nonce}>{css}</style>
   */
  transformCSS?: (css: string) => JSX.Element;
  /**
   * CSS that replaces the default styles; `color` and `height` are then ignored.
   * @default undefined
   */
  style?: string;
}

const Next13ProgressBar = withSuspense(ProgressBar);
export { Next13ProgressBar, useRouter };

export default Next13ProgressBar;
