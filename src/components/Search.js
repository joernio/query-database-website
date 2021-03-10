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
		<div><span className="search-result-tags">tags: {r.tags.join(',')}</span></div>
		</div>
	))

	return <div>{options}</div>
}

const Search = () => {
	var pluginData = usePluginData('staticcode');
	var lunrIdx = lunr.Index.load(pluginData.lunrIdx);

  const [results, setResults] = useState(pluginData.qdb);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    triggerSearch(searchQuery, selectedFilters)
  }

  const triggerSearch = (query, selectedFilters) => {
    const filtersQuery = selectedFilters.map((entry) => 'tags:' + entry).join(' ');
		const found = lunrIdx.search(query + ' ' + filtersQuery);
		const refs = found.map(f => f.ref);
		const filtered = pluginData.qdb.filter(q => refs.includes(q.name));
		setResults(filtered)
  }

  const handleFilterOptionClick = (e) => {
    const filterValue = e.target.dataset.id;
    const selectedFilterClass = 'search-filter-selected';
    if (selectedFilters.includes(filterValue)) {
      e.target.classList.remove(selectedFilterClass)
      setSelectedFilters(selectedFilters.filter(item => item != filterValue))
    } else {
      e.target.classList.add(selectedFilterClass)
      setSelectedFilters(selectedFilters.concat(filterValue))
    }
    triggerSearch(searchQuery, selectedFilters)
  }

	return (
	  <div className="search">
      <input className="search" placeholder="Search for queries..." onChange={handleChange} />
        <div class="search-filter">
          <span>FILTER:</span>
          <div class="search-filter-options">
              <a onClick={handleFilterOptionClick} data-id="badfn">badfn</a> |
              <a onClick={handleFilterOptionClick} data-id="integers">integers</a> |
              <a onClick={handleFilterOptionClick} data-id="metrics">metrics</a> |
              <a onClick={handleFilterOptionClick} data-id="setxid">setxid</a> |
              <a onClick={handleFilterOptionClick} data-id="strings">strings</a> |
              <a onClick={handleFilterOptionClick} data-id="uaf">uaf</a>
          </div>
        </div>
		<hr />
		<Results results={results} />
	  </div>
	)
}

export default Search;
