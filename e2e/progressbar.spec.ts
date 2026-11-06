import { expect, test, type Page } from '@playwright/test';

const bar = (page: Page) => page.locator('#nprogress');

/** The /slow page takes 1.5s to render, so a started bar is visible well before it finishes. */
async function expectBarDuringSlowNavigation(page: Page) {
  await expect(bar(page)).toBeAttached({ timeout: 1000 });
  await expect(page.getByRole('heading', { name: 'slow' })).toBeVisible();
  await expect(bar(page)).toHaveCount(0);
}

/** Records whether the bar is attached at any point after this call. */
async function watchForBar(page: Page) {
  await expect(bar(page)).toHaveCount(0);
  await page.evaluate(() => {
    const w = window as unknown as { barSeen: boolean };
    w.barSeen = false;
    new MutationObserver(() => {
      if (document.getElementById('nprogress')) w.barSeen = true;
    }).observe(document.body, { childList: true, subtree: true });
  });
}

async function expectBarNeverShown(page: Page) {
  // Give a wrongly started bar time to appear before asserting it didn't.
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => (window as unknown as { barSeen: boolean }).barSeen)).toBe(false);
}

test.describe('useRouter().replace()', () => {
  test('navigates when only the search params change', async ({ page }) => {
    await page.goto('/router?tab=1');
    await page.getByRole('button', { name: 'replace ?tab=2' }).click();
    await expect(page).toHaveURL('/router?tab=2');
    await expect(page.locator('#query')).toHaveText('query = tab=2');
  });

  test('navigates to the same pathname without a query', async ({ page }) => {
    await page.goto('/router?redirect=%2F&login=true');
    await page.getByRole('button', { name: 'replace without query' }).click();
    await expect(page).toHaveURL('/router');
    await expect(page.locator('#query')).toHaveText('query =');
  });

  test('does not add a history entry', async ({ page }) => {
    await page.goto('/router');
    const lengthBefore = await page.evaluate(() => history.length);
    await page.getByRole('button', { name: 'replace /slow' }).click();
    await expectBarDuringSlowNavigation(page);
    expect(await page.evaluate(() => history.length)).toBe(lengthBefore);
  });
});

test.describe('useRouter().push()', () => {
  test('shows the bar until the navigation finishes', async ({ page }) => {
    await page.goto('/router');
    await page.getByRole('button', { name: 'push /slow' }).click();
    await expectBarDuringSlowNavigation(page);
  });
});

test('useRouter() returns the same object across renders', async ({ page }) => {
  await page.goto('/router');
  // Strict Mode (next dev) runs the effect twice on mount, so compare against the count after mounting.
  await expect(page.locator('#effect-runs')).not.toBeEmpty();
  const runsAfterMount = await page.locator('#effect-runs').textContent();
  await page.getByRole('button', { name: 'rerender' }).click();
  await page.getByRole('button', { name: 'rerender' }).click();
  await expect(page.getByText('renders = 2')).toBeVisible();
  await expect(page.locator('#effect-runs')).toHaveText(runsAfterMount!);
});

test.describe('link clicks', () => {
  test('show the bar until the navigation finishes', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'to slow' }).click();
    await expectBarDuringSlowNavigation(page);
  });

  test('keep working on pages that contain an SVG <a>', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'to svg' }).click();
    await expect(page.getByRole('heading', { name: 'svg' })).toBeVisible();
    await page.getByRole('link', { name: 'html link to slow' }).click();
    await expectBarDuringSlowNavigation(page);
  });

  test('to non-http protocols do not start the bar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'to links' }).click();
    await expect(page.getByRole('heading', { name: 'links' })).toBeVisible();
    await watchForBar(page);
    await page.getByRole('link', { name: 'sms link' }).click();
    await expectBarNeverShown(page);
  });
});

test('stops tracking link clicks once unmounted', async ({ page }) => {
  await page.goto('/toggle');
  await page.getByRole('button', { name: 'hide bar' }).click();
  await watchForBar(page);
  await page.getByRole('link', { name: 'to slow' }).click();
  await expectBarNeverShown(page);
});

test.describe('styles', () => {
  test('colour the bar with the color prop', async ({ page }) => {
    await page.goto('/router');
    await page.getByRole('button', { name: 'push /slow' }).click();
    await expect(page.locator('#nprogress .bar')).toHaveCSS('background-color', 'rgb(255, 0, 0)', { timeout: 1000 });
  });

  test('accept a numeric height in pixels', async ({ page }) => {
    await page.goto('/toggle');
    await page.getByRole('link', { name: 'to slow' }).click();
    await expect(page.locator('#nprogress .bar')).toHaveCSS('height', '5px', { timeout: 1000 });
  });

  test('carry the nonce prop on the style tag', async ({ page }) => {
    await page.goto('/');
    const nonces = await page.locator('style').evaluateAll((els) => els.map((el) => (el as HTMLStyleElement).nonce));
    expect(nonces).toContain('test-nonce');
  });

  test('are rendered through transformCSS when given', async ({ page }) => {
    await page.goto('/toggle');
    await expect(page.getByTestId('custom-css')).toBeAttached();
    expect(await page.getByTestId('custom-css').textContent()).toContain('#nprogress');
  });
});
