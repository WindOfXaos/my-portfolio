import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/moaaz-lotfi-87b41b1a6/',
  },
  { name: 'GitHub', href: 'https://github.com/WindOfXaos' },
  { name: 'Behance', href: 'https://www.behance.net/muazwaleed' },
  { name: 'YouTube', href: 'https://www.youtube.com/@metras.' },
] as const;

test('visitor sees the profile slice with metadata and safe social links', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Moaaz W. Lotfi');

  await expect(
    page.getByRole('heading', { level: 1, name: /Moaaz W\. Lotfi/ }),
  ).toBeVisible();
  await expect(page.getByText('aka WindOfXaos')).toBeVisible();
  await expect(page.getByText('DEVELOPER | DESIGNER')).toBeVisible();

  for (const { name, href } of socialLinks) {
    const link = page.getByRole('link', { name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }

  await expect(
    page.getByRole('img', { name: 'Scroll to see more' }),
  ).toBeVisible();

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://windofxaos.github.io/my-portfolio',
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /.+/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Moaaz W. Lotfi',
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary',
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'href',
    '/favicon.png',
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'type',
    'image/png',
  );

  const backdrop = await page
    .locator('#profile')
    .evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(backdrop).toContain('profile-bg.jpg');

  // Analytics is unconfigured in this environment, so it must stay out.
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  await expect(await page.content()).not.toContain('G-ZJJ3CJ4SGN');
});

test('social links expose a visible keyboard focus indicator', async ({
  page,
}) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'GitHub' });
  await link.focus();
  await expect(link).toBeFocused();

  const outlineStyle = await link.evaluate(
    (element) => getComputedStyle(element).outlineStyle,
  );
  expect(outlineStyle).not.toBe('none');
});

test('profile has no serious or critical accessibility violations', async ({
  page,
}) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) =>
      violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(blocking).toEqual([]);
});
