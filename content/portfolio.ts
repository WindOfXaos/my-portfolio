/**
 * Typed portfolio-content boundary for the profile slice.
 *
 * Rendering components consume this module; they must not embed personal
 * details, social destinations, or copy of their own. Strictness is enforced
 * by `pnpm typecheck` (strict TypeScript, no `any`).
 */

export type SocialIcon = 'linkedin' | 'github' | 'behance' | 'youtube';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}

export interface ProfileContent {
  readonly name: string;
  readonly alias: string;
  readonly role: string;
  /** Public URL of the profile backdrop, served from `public/`. */
  readonly backgroundImage: string;
  readonly socialLinks: readonly SocialLink[];
  /** Caption for the (decorative) scroll affordance. */
  readonly scrollHint: string;
}

export interface Interest {
  readonly label: string;
  /** Badge background color (hex with alpha, from the legacy design). */
  readonly color: string;
}

export interface AboutContent {
  readonly heading: string;
  readonly statement: string;
  readonly interestsLabel: string;
  readonly interests: readonly Interest[];
}

export const profileContent: ProfileContent = {
  name: 'Moaaz W. Lotfi',
  alias: 'aka WindOfXaos',
  role: 'DEVELOPER | DESIGNER',
  backgroundImage: '/profile-bg.jpg',
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/moaaz-lotfi-87b41b1a6/',
      icon: 'linkedin',
    },
    { label: 'GitHub', href: 'https://github.com/WindOfXaos', icon: 'github' },
    {
      label: 'Behance',
      href: 'https://www.behance.net/muazwaleed',
      icon: 'behance',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@metras.',
      icon: 'youtube',
    },
  ],
  scrollHint: 'Scroll to see more',
};

export const aboutContent: AboutContent = {
  heading: 'About',
  statement:
    'Bringing together art, code, and theory to create simple things people can trust and enjoy.',
  interestsLabel: 'I’m into',
  interests: [
    { label: 'Computer Graphics', color: '#00860091' },
    { label: 'Game Development', color: '#86000091' },
    { label: 'Web Development', color: '#00838873' },
    { label: 'Tools Programming', color: '#84860091' },
    { label: 'Automation', color: '#80004d75' },
  ],
};
