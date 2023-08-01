'use client';
/**
 *
 * NProgress
 *
 */

import * as NProgress from 'nprogress';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Next13ProgressProps } from '.';

const Next13Progress = ({
  color = '#29D',
  startPosition = 0.3,
  height = 3,
  options,
  nonce,
  transformCSS = (css) => <style nonce={nonce}>{css}</style>,
}: Next13ProgressProps) => {
  React.useEffect(() => {
    // show progress bar for the initial load.
    NProgress.configure({ ...options });
    NProgress.set(startPosition);
    NProgress.start();
    NProgress.inc(); // trick to show it right away
    return () => {
      NProgress.done();
    };
  }, []);
  return transformCSS(`
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${color};
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100%;
      height: ${height}px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
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
      -webkit-animation: nprogresss-spinner 400ms linear infinite;
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
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes nprogress-spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `);
};

Next13Progress.propTypes = {
  color: PropTypes.string,
  startPosition: PropTypes.number,
  stopDelayMs: PropTypes.number,
  height: PropTypes.number,
  showOnShallow: PropTypes.bool,
  options: PropTypes.object,
  nonce: PropTypes.string,
  transformCSS: PropTypes.func,
};

export default React.memo(Next13Progress);
