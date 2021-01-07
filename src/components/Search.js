import React  from 'react';

import {usePluginData} from '@docusaurus/useGlobalData';

const Results = (props) => {
	const options = props.results.map(r => (
		<div class="search-result">
		{r.name} | {r.title}
		</div>
	))

	return <div>{options}</div>
}

const Search = () => {
	const pluginData = usePluginData('staticcode');
	const results = pluginData.qdb;

	return (
	  <div class="search">
		<input class="search" placeholder="Search for queries..." />
		<hr />
		<Results results={results} />
	  </div>
	)
}

export default Search;
