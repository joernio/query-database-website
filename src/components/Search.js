import React, { useState }  from 'react';
import Code from '@site/src/components/Code';
import {usePluginData} from '@docusaurus/useGlobalData';
const itemsjs = require('itemsjs');

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
		<div><span className="search-result-tags">tags: {r.tags.join(',')}</span></div>
		</div>
	))

	return <div>{options}</div>
}

const Search = () => {
  var pluginData = usePluginData('staticcode');
  var itemsJsIdx = itemsjs(pluginData.qdb, {
      sortings: {
        name_asc: {
          field: 'name',
          order: 'asc'
        }
      },
    searchableFields: ['name', 'title', 'description', 'tags']
  });

  const [results, setResults] = useState(pluginData.qdb);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    triggerSearch(e.target.value, selectedFilters)
    setSearchQuery(e.target.value)
  }

  const triggerSearch = (query, selectedFilters) => {
    const result = itemsJsIdx.search({
      per_page: 100,
      sort: 'name_asc',
      query: query,
    });
    const found = result.data.items;
    setResults(found)
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
