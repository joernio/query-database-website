const path = require('path');

module.exports = {
  title: 'Joern Query Database',
  tagline: 'The central query database for the code analysis platform Joern',
  url: 'https://docs.joern.io/',
  baseUrl: '/query-database-website/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'joernio',
  projectName: 'query-database-website',
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
