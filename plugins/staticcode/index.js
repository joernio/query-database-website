const fs = require('fs');
const Prism = require('prismjs');
const parse = require('html-react-parser')

module.exports = function (context, options) {
  const padWithNewlines = (first, second) => {
    const firstCount = first.split("\n").length;
    const secondCount = second.split("\n").length;

    var firstPadded = first.slice();
    var secondPadded = second.slice();

    if (firstCount > secondCount) {
      secondPadded = secondPadded.concat("\n".repeat(firstCount - secondCount));
    } else if (secondCount > firstCount) {
      firstPadded = firstPadded.concat("\n".repeat(secondCount - firstCount));
    }

    return {first: firstPadded, second: secondPadded};
  }

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
        let codeExamples = result.codeExamples
        if (typeof codeExamples != 'undefined'
          && codeExamples.positive != 'undefined'
          && Array.isArray(codeExamples.positive)
          && typeof codeExamples.positive[0] != 'undefined') {
          let pos = codeExamples.positive[0];
            result.positiveExample = pos.replace(/^\s*\n/gm, "");
        }
        if (typeof codeExamples != 'undefined'
          && typeof codeExamples.negative != 'undefined'
          && Array.isArray(codeExamples.positive)
          && typeof codeExamples.negative[0] != 'undefined') {
          let neg = codeExamples.negative[0];
            result.negativeExample = neg.replace(/^\s*\n/gm, "");
        }
        const html = Prism.highlight(t.formattedTraversal, Prism.languages.javascript, 'javascript');
        result.highlightedTraversal = html;
        return result;
      });

      const withHighlightedExamples = withHighlightedTraversal.map(e => {
        const hasBothExamples = typeof e.positiveExample != 'undefined' && typeof e.negativeExample != 'undefined';
        if (!hasBothExamples) {
          return e;
        }
        var result = e;

        var positiveExample = e.positiveExample.slice();
        var negativeExample = e.negativeExample.slice();
        if (hasBothExamples) {
          const padded = padWithNewlines(positiveExample, negativeExample);
          positiveExample = padded.first;
          negativeExample = padded.second;
        }
        result.positiveExampleHighlighted = Prism.highlight(positiveExample, Prism.languages.javascript, 'javascript');
        result.negativeExampleHighlighted = Prism.highlight(negativeExample, Prism.languages.javascript, 'javascript');
        return result;
      });

      content.qdb = withHighlightedExamples;

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
