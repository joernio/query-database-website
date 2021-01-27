import React, { useState }  from 'react';
import Code from '@site/src/components/Code';
import {usePluginData} from '@docusaurus/useGlobalData';
const lunr = require('lunr');

const Results = (props) => {
	const options = props.results.map(r => (
		<div className="search-result">
		<div><span className="search-result-name">{r.name}</span></div>
		<div>
		<h4>{r.title}</h4>
		<p>
		{r.description}
      </p>
        CPGQL Query:
        <Code language="js" code={r.traversalAsString} />
		</div>
		<div><span className="search-result-author">author: {r.author}</span></div>
		</div>
	))

	return <div>{options}</div>
}

const Search = () => {
	var pluginData = usePluginData('staticcode');
	var lunrIdx = lunr.Index.load(pluginData.lunrIdx);

	const [results, setResults] = useState(pluginData.qdb);

	const handleChange = (e) => {
		const found = lunrIdx.search(e.target.value);
		const refs = found.map(f => f.ref);
		const filtered = pluginData.qdb.filter(q => refs.includes(q.name));
		setResults(filtered)
	}

	return (
	  <div className="search">
		<input className="search" placeholder="Search for queries..." onChange={handleChange} />
		<hr />
		<Results results={results} />
	  </div>
	)
}

export default Search;
