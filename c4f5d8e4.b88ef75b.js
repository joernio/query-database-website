(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{78:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=(t(80),t(89)),c=(t(82),t(22)),s=(t(83),t(74),t(75),t(124)),u=t.n(s);function i(e){var a=e.code,t=e.language;return Object(n.useEffect)((function(){u.a.highlightAll()}),[]),l.a.createElement("div",{className:"code"},l.a.createElement("pre",null,l.a.createElement("code",{className:"language-"+t},a)))}var m=t(92),o=t(125),g=function(e){var a=e.name,t=e.label,n=e.isChecked,r=void 0!==n&&n,c=e.onChange;return l.a.createElement("div",null,l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",name:a,checked:r,onChange:c}),t))},d=function(e){var a=e.tags,t=e.onChange,r=Object(n.useState)(new Map),c=r[0],s=r[1],u=function(e){var a=e.target.name,n=e.target.checked,l=new Map(c);n?l.set(a,a.replace("tags-","")):l.delete(a),s(l),t(l)},i=a.buckets.map((function(e){return l.a.createElement(g,{name:"tags-"+e.key,label:e.key+" - "+e.doc_count,isChecked:c.get("tags-"+e.key),onChange:u})}));return l.a.createElement("div",null,l.a.createElement("div",null,"TAGS"),i)},h=function(e){var a=e.results.map((function(e){return l.a.createElement("div",{className:"search-result"},l.a.createElement("div",null,l.a.createElement("span",{className:"search-result-name"},e.name)),l.a.createElement("div",null,l.a.createElement("h4",null,e.title),l.a.createElement("p",null,e.description),"CPGQL Query:",l.a.createElement(i,{language:"js",code:e.traversalAsString})),l.a.createElement("div",null,l.a.createElement("span",{className:"search-result-author"},"author: ",e.author)),l.a.createElement("div",null,l.a.createElement("span",{className:"search-result-tags"},"tags: ",e.tags.join(","))))}));return l.a.createElement("div",null,a)},E=function(){var e=Object(m.usePluginData)("staticcode"),a=o(e.qdb,{sortings:{name_asc:{field:"name",order:"asc"}},aggregations:{tags:{title:"Tags",size:20}},searchableFields:["name","title","description","tags"]}),t=Object(n.useState)({results:e.qdb,tags:a.search({per_page:100}).data.aggregations.tags}),r=t[0],c=t[1],s=Object(n.useState)([]),u=s[0],i=s[1],g=Object(n.useState)(""),E=g[0],v=g[1],p=function(e,t){var n={per_page:100,sort:"name_asc",query:e};t.length>0?(console.log("[DEBUG] Did select filters: "+t),n.filters={tags:t}):console.log("[DEBUG] Selected filters are empty");var l=a.search(n);c({results:l.data.items,tags:l.data.aggregations.tags})};return l.a.createElement("div",{className:"search"},l.a.createElement("div",{className:"search-facets"},l.a.createElement(d,{tags:r.tags,onChange:function(e){var a=[].concat(e.values());p(E,a),i(a)}})),l.a.createElement("div",{className:"search-input"},l.a.createElement("input",{className:"search",placeholder:"Search for queries...",onChange:function(e){p(e.target.value,u),v(e.target.value)}}),l.a.createElement("hr",null),l.a.createElement(h,{results:r.results})))};l.a.Fragment,l.a.Fragment,l.a.Fragment;a.default=function(){var e=Object(c.default)().siteConfig,a=void 0===e?{}:e;return l.a.createElement(r.a,{title:""+a.title,description:"Joern Query Database"},l.a.createElement("main",null,l.a.createElement("section",{className:"search-section"},l.a.createElement(E,null))))}}}]);