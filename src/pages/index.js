import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import Search from '@site/src/components/Search'

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const joernTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#4ec001"
    },
    secondary: {
      main: "#4ec001"
    }
  }
});

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <ThemeProvider theme={joernTheme}>
    <Layout
      title={`${siteConfig.title}`}
      description="Joern Query Database">
      <main>
	  <section className="search-section">
		  <Search />
	  </section>
      </main>
    </Layout>
    </ThemeProvider>
  );
}

export default Home;
