const fs = require('fs');
const Prism = require('prismjs');
const parse = require('html-react-parser')

module.exports = function (context, options) {
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

  return {
    name: 'staticcode',
    async loadContent() {
      const content = {};

      const qdbString = fs.readFileSync("static/json/querydb.json", 'utf8').trim();
      const qdbJson = JSON.parse(qdbString);
      const withFormattedTraversal = qdbJson.map(e => {
        let result = e;
        result.formattedTraversal = formatTraversal(e.traversalAsString);
        return result;
      });
      const withHighlightedTraversal = withFormattedTraversal.map(t => {
        let result = t;
        const html = Prism.highlight(t.formattedTraversal, Prism.languages.javascript, 'javascript');
        result.highlightedTraversal = html;
        return result;
      });

      content.qdb = withHighlightedTraversal;

      return content;
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData({
        qdb: content.qdb,
      });
    },
  };
};
