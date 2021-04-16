const itemsjs = require('itemsjs');

import React, { useState }  from 'react';
import Code from '@site/src/components/Code';
import {usePluginData} from '@docusaurus/useGlobalData';
import { Button, Card, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Prism from "prismjs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
    width: '100%'
  },
}));

const ShinyFilters = ({ filters, onChange }) => {
  const actualData = {
    language: filters.language.reduce((a, x) => ({...a, [x]: false}), {}),
    tags: filters.tags.reduce((a, x) => ({...a, [x]: false}), {}),
  };

  const classes = useStyles();
  const [state, setState] = React.useState(actualData);
  const { tags, language } = state;

  const handleChange = (event) => {
    const nextState = {language: state.language, tags: {...state.tags, [event.target.name]: event.target.checked }};
    onChange(nextState);
    setState(nextState);
  };

  const handleLanguageChange = (event) => {
    const nextState = {tags: state.tags, language: {...state.language, [event.target.name]: event.target.checked }};
    onChange(nextState);
    setState(nextState);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend"><h3>Language</h3></FormLabel>
        <FormGroup>
          {Object.entries(actualData.language).map(entry =>(
            <FormControlLabel
              control={<Checkbox checked={language[entry[0]]} onChange={handleLanguageChange} name={entry[0]} />}
              label={entry[0]}
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend"><h3>Tags</h3></FormLabel>
        <FormGroup>
          {Object.entries(actualData.tags).map(entry =>(
            <FormControlLabel
              control={<Checkbox checked={tags[entry[0]]} onChange={handleChange} name={entry[0]} />}
              label={entry[0]}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  )
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
      <Button variant="contained" color="primary"
        className="search-result-copy"
        onClick={(e) => handleButtonClick(e, textAreaId)}>
        {buttonText}
      </Button>
    </div>
  )
}

const Results = (props) => {
  const formatTraversal = (traversalAsString) => {
    const lines = traversalAsString.split('\n')
    lines.shift()
    const whitespacePrefix = lines[0].match(/^\s*/)[0]
    const replace = new RegExp("^" + whitespacePrefix, "g")
    const clean = lines.map(function(line) {
      return line.replace(replace, "")
    }).join('\n')
    return "({" + clean + "}).l"
  }

  const options = props.results.map(r => (
    <Card className="main-card mdc-elevation--z10">
      <div className="search-result">
        <div><h2><span className="search-result-name">{r.name}</span></h2></div>
        <div>
          <h4>{r.title}</h4>
          <p>
            {r.description}
          </p>
          CPGQL Query:
          <Code language="js" code={ formatTraversal(r.traversalAsString) } queryName={r.name} />
          <textarea className="hidden" value={ formatTraversal(r.traversalAsString) } id={r.name} />
        </div>
        <div><span className="search-result-author">author: {r.author}</span></div>
        <div><span className="search-result-tags">tags: {r.tags.join(',')}</span></div>
        <CopyButton textAreaId={r.name} />
      </div>
    </Card>
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

  const initialSearch = itemsJsIdx.search({per_page: 100, sort: 'name_asc'}).data;

  const initialAggregations = initialSearch.aggregations;
  const initialFilters = {
    language: initialAggregations.language.buckets.map((x) => { return x.key }),
    tags: initialAggregations.tags.buckets.map((x) => { return x.key }),
  }

  const [data, setData] = useState({
    results: initialSearch.items,
  });
  const [selectedFilters, setSelectedFilters] = useState({language: [], tags: []});
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (e) => {
    const updatedQuery = e.target.value.slice(0);
    triggerSearch(updatedQuery, selectedFilters)
    setSearchQuery(updatedQuery)
  }

  const triggerSearch = (query, filterSelection) => {
    let searchOptions = {
      per_page: 100,
      sort: 'name_asc',
      filters: filterSelection,
    }
    if (typeof query !== 'undefined' && query.length > 0) {
      searchOptions['query'] = query;
    }
    const result = itemsJsIdx.search(searchOptions);
    setData({
      results: result.data.items,
    })

    // TODO: replace
    // PrismJS does not trigger a highlight event at all times when the results
    // displayed are changed, so we force one with a delay. An obviously hacky
    // solution which should be replaced.
    setTimeout(function() { Prism.highlightAll(); }, 50);
  }

  const onShinyFilterChange = (state) => {
    const mappedTags = Object.keys(state.tags).filter(key => {
      return state.tags[key];
    });
    const mappedLanguage = Object.keys(state.language).filter(key => {
      return state.language[key];
    })

    const selected = {
      tags: mappedTags,
      language: mappedLanguage
    };

    setSelectedFilters(selected)
    triggerSearch(searchQuery, selected)
  }

  return (
    <div className="search-wrapper">
      <div className="filler"></div>
      <div className="search">
        <div className="search-facets">
          <ShinyFilters filters={initialFilters} onChange={onShinyFilterChange} />
        </div>
        <div className="search-input">
          <div className="search-field">
            <TextField
              id="standard-basic"
              label="Search for queries..."
              variant="outlined"
              margin="normal"
              fullWidth
              color="primary"
              onChange={handleQueryChange} />
          </div>
          <div className="search-results">
            <Results results={data.results} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;
