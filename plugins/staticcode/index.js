const fs = require('fs');
const lunr = require('lunr');

module.exports = function (context, options) {
  return {
    name: 'staticcode',
    async loadContent() {
      const content = {};

      const qdbString = fs.readFileSync("static/json/querydb.json", 'utf8').trim();
      const qdbJson = JSON.parse(qdbString);
      content.qdb = qdbJson;

      var idx = lunr(function (){
	      this.ref('name');
	      this.field('name')
	      this.field('title')
	      this.field('description')

	      qdbJson.forEach(function (doc) {
		      this.add(doc)
	      }, this)
      })
      content.lunrIdx = idx;
      return content;
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData({
        qdb: content.qdb,
	lunrIdx: content.lunrIdx
      });
    },
  };
};
