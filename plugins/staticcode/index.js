const fs = require('fs');

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

      content.qdb = withFormattedTraversal;

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
