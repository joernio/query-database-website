const fs = require('fs');

module.exports = function (context, options) {
  return {
    name: 'staticcode',
    async loadContent() {
      const qdbString = fs.readFileSync("static/json/querydb.json", 'utf8').trim();
      const qdbJson = JSON.parse(qdbString);
	    console.log(qdbJson);
      return qdbJson;
    },
    async contentLoaded({content, actions}) {
      const {setGlobalData} = actions;
      setGlobalData({
	something: 'Hello 2',
        qdb: content
      });
    },
  };
};
