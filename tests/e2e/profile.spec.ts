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

test('desktop profile preserves the legacy composition', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1153 });
  await page.goto('/');

  const composition = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('#profile');
    const name = document.querySelector<HTMLElement>('.profile-name');
    const role = document.querySelector<HTMLElement>('.profile-role');
    const social = document.querySelector<HTMLElement>('.profile-social');
    const scrollHint = document.querySelector<HTMLElement>('.scroll-hint');

    if (!hero || !name || !role || !social || !scrollHint) {
      throw new Error('Profile composition is incomplete');
    }

    const nameRect = name.getBoundingClientRect();
    const roleRect = role.getBoundingClientRect();
    const socialRect = social.getBoundingClientRect();
    const scrollRect = scrollHint.getBoundingClientRect();

    return {
      backgroundColor: getComputedStyle(hero).backgroundColor,
      nameFontSize: getComputedStyle(name).fontSize,
      nameY: nameRect.y,
      nameWidth: nameRect.width,
      roleY: roleRect.y,
      roleWidth: roleRect.width,
      socialWidth: socialRect.width,
      scrollY: scrollRect.y,
    };
  });

  expect(composition.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  expect(composition.nameFontSize).toBe('134.4px');
  expect(Math.abs(composition.nameY - 446)).toBeLessThan(2);
  expect(Math.abs(composition.nameWidth - 1220)).toBeLessThan(3);
  expect(Math.abs(composition.roleY - 629)).toBeLessThan(2);
  expect(Math.abs(composition.roleWidth - 279)).toBeLessThan(2);
  expect(Math.abs(composition.socialWidth - 182)).toBeLessThan(2);
  expect(Math.abs(composition.scrollY - 872)).toBeLessThan(3);
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

test('visitor navigates sections through an accessible named navigation', async ({
  page,
}) => {
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: 'Portfolio sections' });
  await expect(nav).toBeVisible();

  for (const name of ['Profile', 'About', 'Projects']) {
    await expect(nav.getByRole('link', { name })).toBeVisible();
  }

  const listItems = await nav.locator('ul > li > a').count();
  expect(listItems).toBe(3);

  await expect(nav.getByRole('link', { name: 'Profile' })).toHaveAttribute(
    'href',
    '#profile',
  );
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute(
    'href',
    '#about',
  );
  await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute(
    'href',
    '#projects',
  );
});

test('navigation exposes the current fragment destination', async ({
  page,
}) => {
  await page.goto('/#about');
  const nav = page.getByRole('navigation', { name: 'Portfolio sections' });
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute(
    'aria-current',
    'location',
  );
  await expect(nav.getByRole('link', { name: 'Profile' })).not.toHaveAttribute(
    'aria-current',
    'location',
  );

  await nav.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute(
    'aria-current',
    'location',
  );
  await expect(nav.getByRole('link', { name: 'About' })).not.toHaveAttribute(
    'aria-current',
    'location',
  );

  // The persistent current-state treatment settles independent of hover or
  // focus: move the pointer off the navigation, then assert the settled
  // high-contrast style (retrying through the restrained transition).
  await page.mouse.move(10, 700);
  const projectsLink = nav.getByRole('link', { name: 'Projects' });
  await expect(projectsLink).toHaveCSS('color', 'rgb(13, 13, 13)');
  await expect(projectsLink).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
});

test('hash destinations work on initial load and in-page navigation', async ({
  page,
}) => {
  await page.goto('/#about');
  await expect(page.locator('#about')).toBeInViewport();

  await page.goto('/#profile');
  await expect(page.locator('#profile')).toBeInViewport();

  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Portfolio sections' });
  await nav.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#about')).toBeInViewport();

  await nav.getByRole('link', { name: 'Profile' }).click();
  await expect(page).toHaveURL(/#profile$/);
  await expect(page.locator('#profile')).toBeInViewport();

  await nav.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
  await expect(
    page.getByRole('heading', { level: 2, name: 'Projects' }),
  ).toBeVisible();
});

test('navigation is keyboard operable with visible focus', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation', { name: 'Portfolio sections' });
  const profileLink = nav.getByRole('link', { name: 'Profile' });
  const aboutLink = nav.getByRole('link', { name: 'About' });

  await page.keyboard.press('Tab');
  await expect(profileLink).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(aboutLink).toBeFocused();

  const outlineStyle = await aboutLink.evaluate(
    (element) => getComputedStyle(element).outlineStyle,
  );
  expect(outlineStyle).not.toBe('none');

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#about')).toBeInViewport();
});

test('profile and about stay usable on mobile, desktop, and short landscape', async ({
  page,
}) => {
  for (const viewport of [
    { width: 375, height: 667 },
    { width: 1280, height: 800 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Portfolio sections' });
    await expect(nav).toBeVisible();
    for (const name of ['Profile', 'About', 'Projects']) {
      const link = nav.getByRole('link', { name });
      await expect(link).toBeVisible();
      if (viewport.width === 375) {
        const box = await link.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    }

    await expect(page.locator('#profile')).toBeVisible();
    await expect(
      page.getByText(
        'Bringing together art, code, and theory to create simple things people can trust and enjoy.',
      ),
    ).toBeVisible();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const aboutBox = await page.locator('#about').boundingBox();
    const profileBox = await page.locator('#profile').boundingBox();
    expect(aboutBox?.height).toBeGreaterThan(0);
    expect(profileBox?.height).toBeGreaterThan(0);
  }
});

test('about keeps its dark patterned treatment with colored badges', async ({
  page,
}) => {
  await page.goto('/');

  const treatment = await page.locator('#about').evaluate((element) => {
    const section = getComputedStyle(element);
    const patterned = element.querySelector<HTMLElement>('.about-background');
    if (!patterned) throw new Error('About pattern layer is missing');
    const pattern = getComputedStyle(patterned);
    const badges = [
      ...element.querySelectorAll<HTMLElement>('.about-badge'),
    ].map((badge) => getComputedStyle(badge).backgroundColor);
    const durations = [
      ...element.querySelectorAll<HTMLElement>('.about-badge'),
    ].map((badge) => getComputedStyle(badge).transitionDuration);
    return {
      sectionBackground: section.backgroundColor,
      patternImage: pattern.backgroundImage,
      badges,
      durations,
    };
  });

  expect(treatment.sectionBackground).toBe('rgb(13, 13, 13)');
  expect(treatment.patternImage).toContain('linear-gradient');
  expect(treatment.badges).toHaveLength(5);
  expect(new Set(treatment.badges).size).toBeGreaterThanOrEqual(4);
  for (const duration of treatment.durations) {
    const seconds = Number.parseFloat(duration);
    expect(seconds).toBeLessThanOrEqual(0.3);
  }
});

test('reduced motion suppresses nonessential about and navigation motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const motion = await page.evaluate(() => {
    const patterned = document.querySelector<HTMLElement>('.about-background');
    const badge = document.querySelector<HTMLElement>('.about-badge');
    const navLink = document.querySelector<HTMLElement>('.site-nav-link');
    if (!patterned || !badge || !navLink) {
      throw new Error('Motion targets are missing');
    }
    return {
      patternAnimation: getComputedStyle(patterned).animationName,
      badgeTransition: getComputedStyle(badge).transitionDuration,
      navTransition: getComputedStyle(navLink).transitionDuration,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(
    motion.patternAnimation === 'none' || motion.patternAnimation === '',
  ).toBe(true);
  expect(['0s', '0s, 0s']).toContain(motion.badgeTransition);
  expect(['0s', '0s, 0s']).toContain(motion.navTransition);
  expect(motion.scrollBehavior).toBe('auto');
});

test('page exposes main, navigation, and section landmarks in order', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('navigation', { name: 'Portfolio sections' }),
  ).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.locator('main #profile')).toBeVisible();
  await expect(page.locator('main #about')).toBeVisible();
  await expect(page.locator('main #projects')).toBeVisible();

  const headings = await page.getByRole('heading').evaluateAll((elements) =>
    elements.map((element) => ({
      level: Number(element.tagName.slice(1)),
      text: element.textContent?.trim() ?? '',
    })),
  );
  expect(headings[0]?.level).toBe(1);
  expect(headings.map((heading) => heading.level)).toEqual([1, 2, 2]);
});

test('visitor sees the about statement and five interests', async ({
  page,
}) => {
  await page.goto('/');

  const about = page.locator('#about');
  await expect(about).toBeVisible();
  // The h2 stays the section's accessible name but is visually hidden so
  // the positioning statement remains the visual lead (legacy design).
  const aboutHeading = page.getByRole('heading', { level: 2, name: 'About' });
  await expect(aboutHeading).toBeAttached();
  await expect(about).toHaveAttribute('aria-labelledby', 'about-heading');
  const headingBox = await aboutHeading.boundingBox();
  expect(headingBox?.height).toBeLessThanOrEqual(2);
  await expect(
    about.getByText(
      'Bringing together art, code, and theory to create simple things people can trust and enjoy.',
    ),
  ).toBeVisible();
  for (const interest of [
    'Computer Graphics',
    'Game Development',
    'Web Development',
    'Tools Programming',
    'Automation',
  ]) {
    await expect(about.getByText(interest, { exact: true })).toBeVisible();
  }
});
