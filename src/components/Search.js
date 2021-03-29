const itemsjs = require('itemsjs');

import React, { useState }  from 'react';
import Code from '@site/src/components/Code';
import {usePluginData} from '@docusaurus/useGlobalData';
import { TextField } from '@material-ui/core';

const Checkbox = ({ name, label, isChecked = false, onChange }) => (
  <div>
    <label>
      <input type="checkbox" name={name} checked={isChecked} onChange={onChange} />
      {label}
    </label>
  </div>
);

const Filters = ({ tags, onChange, title, prefix }) => {
  const [checkedItems, setCheckedItems] = useState(new Map())

  const handleChange = (e) => {
    const itemKey = e.target.name
    const isItemChecked = e.target.checked
    const updated = new Map(checkedItems)
    if (isItemChecked) {
      updated.set(itemKey, itemKey.replace(prefix, ""))
    } else {
      updated.delete(itemKey)
    }
    setCheckedItems(updated)
    onChange(updated)
  }

  const checkboxes = tags.buckets.map(t => (
    <Checkbox
      name={prefix + t.key}
      label={t.key + " - " + t.doc_count}
      isChecked={checkedItems.get(prefix + t.key)}
      onChange={handleChange} />
  ))

  return <div><div>{title}</div>{checkboxes}</div>
}

const CopyButton = ({ textAreaId }) => {
  const initialText = "COPY TO CLIPBOARD"
  const [buttonText, setButtonText] = useState(initialText)

  const handleButtonClick = (e, selectionId) => {
    var textArea = document.querySelector("#" + selectionId)
    // Removing the hidden class and later adding it again on the text
    // are is necessary because the clipboard API refuses to copy
    // content from a DOM element that is not visible
    textArea.classList.remove("hidden")
    textArea.select()
    var didCopy = document.execCommand("copy")
    setButtonText("COPIED!")
    textArea.classList.add("hidden")
    setTimeout(() => { setButtonText(initialText) }, 1000)
  }

  return (
    <div>
      <button
        className="search-result-copy"
        onClick={(e) => handleButtonClick(e, textAreaId)}>
        {buttonText}
      </button>
    </div>
  )
}

const Results = (props) => {
  const cleanTraversal = (traversalAsString) => {
    const lines = traversalAsString.split('\n')
    lines.shift()
    const whitespacePrefix = lines[0].match(/^\s*/)[0]
    const replace = new RegExp("^" + whitespacePrefix, "g")
    return lines.map(function(line) {
      return line.replace(replace, "")
    }).join('\n')
  }

	const options = props.results.map(r => (
		<div className="search-result">
		<div><span className="search-result-name">{r.name}</span></div>
		<div>
		<h4>{r.title}</h4>
		<p>
		{r.description}
      </p>
        CPGQL Query:
        <Code language="js" code={cleanTraversal(r.traversalAsString)} queryName={r.name} />
        <textarea className="hidden" value={"({" + cleanTraversal(r.traversalAsString) + "}).l"} id={r.name} />
		</div>
		<div><span className="search-result-author">author: {r.author}</span></div>
    <div><span className="search-result-tags">tags: {r.tags.join(',')}</span></div>
    <CopyButton textAreaId={r.name} />
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
    aggregations: {
      tags: {
        title: 'Tags',
        size: 20,
        conjunction: false,
      },
      language: {
        title: 'Language',
        size: 20,
        conjunction: false,
      }
    },
    searchableFields: ['name', 'title', 'description', 'tags']
  });

  const [data, setData] = useState({
    results: pluginData.qdb,
    tags: itemsJsIdx.search({per_page: 100}).data.aggregations.tags,
    language: itemsJsIdx.search({per_page: 100}).data.aggregations.language,
  });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (e) => {
    triggerSearch(e.target.value, selectedFilters)
    setSearchQuery(e.target.value)
  }

  const handleLanguageChange = (selectedItems) => {
    handleFiltersChange(selectedItems, "language")
  }

  const handleTagChange = (selectedItems) => {
    handleFiltersChange(selectedItems, "tags")
  }

  const handleFiltersChange = (selectedItems, prefix) => {
    var checkedTags = [];
    selectedItems.forEach(function(value, key) {
       checkedTags.push(key.slice().replace(prefix, ""));
    })
    var updated = JSON.parse(JSON.stringify(selectedFilters));
    updated[prefix] = checkedTags;
    triggerSearch(searchQuery, updated)
    setSelectedFilters(updated);
  }

  const triggerSearch = (query, filterSelection) => {
    var tagsSelection = [];
    if (filterSelection["tags"] !== undefined) {
      tagsSelection = filterSelection["tags"].slice();
    }
    var languageSelection = [];
    if (filterSelection["language"] !== undefined) {
      languageSelection = filterSelection["language"].slice();
    }
    const searchOptions = {
      per_page: 100,
      sort: 'name_asc',
      query: query,
      filters: {
        tags: tagsSelection,
        language: languageSelection,
      }
    }
    const result = itemsJsIdx.search(searchOptions);
    setData({
      results: result.data.items,
      tags: result.data.aggregations.tags,
      language: result.data.aggregations.language,
    })
  }

  return (
    <div className="search">
      <div className="search-facets">
        <Filters
          tags={data.language}
          onChange={handleLanguageChange}
          title="LANGUAGE"
          prefix="language"
        />
        <Filters
          tags={data.tags}
          onChange={handleTagChange}
          title="TAGS"
          prefix="tags"
        />
      </div>
        <div className="search-input">
        <TextField id="standard-basic" label="Search for queries..." variant="outlined" margin="normal" fullWidth onChange={handleQueryChange} />
        <hr />
        <Results results={data.results} />
      </div>

    </div>
  )
}

export default Search;
