(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{78:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=(t(80),t(89)),c=(t(82),t(22)),s=(t(83),t(74),t(75),t(124)),i=t.n(s);function u(e){var a=e.code,t=e.language;return Object(n.useEffect)((function(){i.a.highlightAll()}),[]),r.a.createElement("div",{className:"code"},r.a.createElement("pre",null,r.a.createElement("code",{className:"language-"+t},a)))}var g=t(92),o=t(125),m=function(e){var a=e.name,t=e.label,n=e.isChecked,l=void 0!==n&&n,c=e.onChange;return r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:a,checked:l,onChange:c}),t))},d=function(e){var a=e.tags,t=e.onChange,l=e.title,c=e.prefix,s=Object(n.useState)(new Map),i=s[0],u=s[1],g=function(e){var a=e.target.name,n=e.target.checked,r=new Map(i);n?r.set(a,a.replace(c,"")):r.delete(a),u(r),t(r)},o=a.buckets.map((function(e){return r.a.createElement(m,{name:c+e.key,label:e.key+" - "+e.doc_count,isChecked:i.get(c+e.key),onChange:g})}));return r.a.createElement("div",null,r.a.createElement("div",null,l),o)},h=function(e){var a=function(e){var a=e.split("\n");a.shift();var t=a[0].match(/^\s*/)[0],n=new RegExp("^"+t,"g");return a.map((function(e){return e.replace(n,"")})).join("\n")},t=e.results.map((function(e){return r.a.createElement("div",{className:"search-result"},r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-name"},e.name)),r.a.createElement("div",null,r.a.createElement("h4",null,e.title),r.a.createElement("p",null,e.description),"CPGQL Query:",r.a.createElement(u,{language:"js",code:a(e.traversalAsString)})),r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-author"},"author: ",e.author)),r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-tags"},"tags: ",e.tags.join(","))))}));return r.a.createElement("div",null,t)},p=function(){var e=Object(g.usePluginData)("staticcode"),a=o(e.qdb,{sortings:{name_asc:{field:"name",order:"asc"}},aggregations:{tags:{title:"Tags",size:20,conjunction:!1},language:{title:"Language",size:20,conjunction:!1}},searchableFields:["name","title","description","tags"]}),t=Object(n.useState)({results:e.qdb,tags:a.search({per_page:100}).data.aggregations.tags,language:a.search({per_page:100}).data.aggregations.language}),l=t[0],c=t[1],s=Object(n.useState)({}),i=s[0],u=s[1],m=Object(n.useState)(""),p=m[0],E=m[1],v=function(e,a){var t=[];e.forEach((function(e,n){t.push(n.slice().replace(a,""))}));var n=JSON.parse(JSON.stringify(i));n[a]=t,f(p,n),u(n)},f=function(e,t){var n=[];void 0!==t.tags&&(n=t.tags.slice());var r=[];void 0!==t.language&&(r=t.language.slice());var l={per_page:100,sort:"name_asc",query:e,filters:{tags:n,language:r}},s=a.search(l);c({results:s.data.items,tags:s.data.aggregations.tags,language:s.data.aggregations.language})};return r.a.createElement("div",{className:"search"},r.a.createElement("div",{className:"search-facets"},r.a.createElement(d,{tags:l.language,onChange:function(e){v(e,"language")},title:"LANGUAGE",prefix:"language"}),r.a.createElement(d,{tags:l.tags,onChange:function(e){v(e,"tags")},title:"TAGS",prefix:"tags"})),r.a.createElement("div",{className:"search-input"},r.a.createElement("input",{className:"search",placeholder:"Search for queries...",onChange:function(e){f(e.target.value,i),E(e.target.value)}}),r.a.createElement("hr",null),r.a.createElement(h,{results:l.results})))};r.a.Fragment,r.a.Fragment,r.a.Fragment;a.default=function(){var e=Object(c.default)().siteConfig,a=void 0===e?{}:e;return r.a.createElement(l.a,{title:""+a.title,description:"Joern Query Database"},r.a.createElement("main",null,r.a.createElement("section",{className:"search-section"},r.a.createElement(p,null))))}}}]);