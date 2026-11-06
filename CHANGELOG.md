# Changelogs

## Unreleased

- [Fix] `useRouter().replace()` silently did nothing when the target had the same pathname (e.g. `/?tab=1` → `/?tab=2`). `push` and `replace` now always hand the navigation to Next and only decide whether to show the bar.
- [Fix] `history.replaceState` was patched with the `pushState` proxy (unreleased regression from #32), so every replace added a history entry.
- [Fix] `useRouter()` returns the same object across renders (#28).
- [Fix] A page containing an SVG `<a>` stopped the bar for every link click.
- [Fix] `sms:`, `javascript:` and other non-http links no longer start a bar that never finishes.
- [Fix] Unmounting the bar removes its listeners and restores `history.pushState`/`replaceState`.
- [Fix] `nonce` and `transformCSS` props are applied (they were documented but ignored).
- [Fix] Numeric `height` is treated as pixels.
- [Fix] Types work with `@types/react` 19 and no longer import from `next/dist` internals (#14, #18).
- [Feat] The bundle is marked `'use client'`, so the bar can be rendered directly in a server layout.
- [Ref] Default CSS is minified (#30). `startPosition`, `stopDelayMs` and `showOnShallow` are deprecated; they never had an effect.
- [Chore] Tested in CI against Next.js 14, 15 and 16 with Playwright. Dev dependencies updated (Next 16, React 19, TypeScript 6, ESLint 10, tsup 8.5); `prop-types` dependency removed.

## v1.1.3 -> v1.2.0

- [Feat] Include `Suspense` within the library to allow build of next >= 14.1.0 to to build successfully.
  Regarding issues #22 and #24
- [Ref] Refactor code to remove unnecessary files.
- [Ref] Add default export of `Next13ProgressBar` from the package.
  i.e:
  ```tsx
  import Next13ProgressBar from 'next13-progressbar';
  ```
  can now be used.
