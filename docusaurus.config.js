const path = require('path');

module.exports = {
  title: 'Joern Query Database',
  tagline: 'The central query database for the code analysis platform Joern',
  url: 'https://joern.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'joernio',
  projectName: 'query-database',
  themeConfig: {
    navbar: {
      title: 'Joern Query Database',
      items: [],
    },
    colorMode: {
	defaultMode: 'light',
	disableSwitch: true,
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} ShiftLeft, Inc.`,
    },
  },
  plugins: [
	path.resolve(__dirname, 'plugins/staticcode')
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
