// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  ignores: [
    // Agentic workflow scripts ship with their own conventions and are
    // outside the portfolio migration scope (issue #2).
    '.agents/**',
    '.delegate/**',
  ],
});
