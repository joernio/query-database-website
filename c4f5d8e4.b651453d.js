(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{78:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=(t(79),t(109)),l=(t(87),t(22)),s=(t(88),t(74),t(75),t(164)),u=t.n(s);function i(e){var a=e.code,t=e.language;return Object(n.useEffect)((function(){u.a.highlightAll()}),[]),r.a.createElement("div",{className:"code"},r.a.createElement("pre",null,r.a.createElement("code",{className:"language-"+t},a)))}var m=t(115),o=t(206),g=t(199),d=t(204),f=t(209),E=t(205),v=t(210),h=t(208),p=t(160),b=Object(g.a)((function(e){return{root:{display:"flex"},formControl:{margin:e.spacing(3),width:"100%"}}})),j=function(e){var a=e.filters,t=e.onChange,n={language:a.language.reduce((function(e,a){var t;return Object.assign({},e,((t={})[a]=!1,t))}),{}),tags:a.tags.reduce((function(e,a){var t;return Object.assign({},e,((t={})[a]=!1,t))}),{})},c=b(),l=r.a.useState(n),s=l[0],u=l[1],i=s.tags,m=s.language,o=function(e){var a,n={language:s.language,tags:Object.assign({},s.tags,(a={},a[e.target.name]=e.target.checked,a))};t(n),u(n)},g=function(e){var a,n={tags:s.tags,language:Object.assign({},s.language,(a={},a[e.target.name]=e.target.checked,a))};t(n),u(n)};return r.a.createElement("div",null,r.a.createElement(f.a,{component:"fieldset",className:c.formControl},r.a.createElement(d.a,{component:"legend"},"Language"),r.a.createElement(E.a,null,Object.entries(n.language).map((function(e){return r.a.createElement(v.a,{control:r.a.createElement(h.a,{checked:m[e[0]],onChange:g,name:e[0]}),label:e[0]})})))),r.a.createElement(f.a,{component:"fieldset",className:c.formControl},r.a.createElement(d.a,{component:"legend"},"Tags"),r.a.createElement(E.a,null,Object.entries(n.tags).map((function(e){return r.a.createElement(v.a,{control:r.a.createElement(h.a,{checked:i[e[0]],onChange:o,name:e[0]}),label:e[0]})})))))},O=function(e){var a=e.textAreaId,t="COPY TO CLIPBOARD",c=Object(n.useState)(t),l=c[0],s=c[1];return r.a.createElement("div",null,r.a.createElement("button",{className:"search-result-copy",onClick:function(e){return n=a,(r=document.querySelector("#"+n)).classList.remove("hidden"),r.select(),document.execCommand("copy"),s("COPIED!"),r.classList.add("hidden"),void setTimeout((function(){s(t)}),1e3);var n,r}},l))},N=function(e){var a=function(e){var a=e.split("\n");a.shift();var t=a[0].match(/^\s*/)[0],n=new RegExp("^"+t,"g");return a.map((function(e){return e.replace(n,"")})).join("\n")},t=e.results.map((function(e){return r.a.createElement("div",{className:"search-result"},r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-name"},e.name)),r.a.createElement("div",null,r.a.createElement("h4",null,e.title),r.a.createElement("p",null,e.description),"CPGQL Query:",r.a.createElement(i,{language:"js",code:a(e.traversalAsString),queryName:e.name}),r.a.createElement("textarea",{className:"hidden",value:"({"+a(e.traversalAsString)+"}).l",id:e.name})),r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-author"},"author: ",e.author)),r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-tags"},"tags: ",e.tags.join(","))),r.a.createElement(O,{textAreaId:e.name}))}));return r.a.createElement("div",null,t)},C=function(){var e=Object(m.usePluginData)("staticcode"),a=p(e.qdb,{sortings:{name_asc:{field:"name",order:"asc"}},aggregations:{tags:{title:"Tags",size:20,conjunction:!1},language:{title:"Language",size:20,conjunction:!1}},searchableFields:["name","title","description","tags"]}),t=a.search({per_page:100}).data.aggregations,c={language:t.language.buckets.map((function(e){return e.key})),tags:t.tags.buckets.map((function(e){return e.key}))},l=Object(n.useState)({results:e.qdb}),s=l[0],u=l[1],i=Object(n.useState)({language:[],tags:[]}),g=i[0],d=i[1],f=Object(n.useState)(""),E=f[0],v=f[1],h=function(e,t){var n={per_page:100,sort:"name_asc",query:E,filters:t},r=a.search(n);u({results:r.data.items})};return r.a.createElement("div",{className:"search-wrapper"},r.a.createElement("div",{className:"filler"}),r.a.createElement("div",{className:"search"},r.a.createElement("div",{className:"search-facets"},r.a.createElement(j,{filters:c,onChange:function(e){var a={tags:Object.keys(e.tags).filter((function(a){return e.tags[a]})),language:Object.keys(e.language).filter((function(a){return e.language[a]}))};d(a),h(E,a)}})),r.a.createElement("div",{className:"search-input"},r.a.createElement("div",{className:"search-field"},r.a.createElement(o.a,{id:"standard-basic",label:"Search for queries...",variant:"outlined",margin:"normal",fullWidth:!0,onChange:function(e){h(e.target.value,g),v(e.target.value)}})),r.a.createElement("div",{className:"search-results"},r.a.createElement(N,{results:s.results})))))};a.default=function(){var e=Object(l.default)().siteConfig,a=void 0===e?{}:e;return r.a.createElement(c.a,{title:""+a.title,description:"Joern Query Database"},r.a.createElement("main",null,r.a.createElement("section",{className:"search-section"},r.a.createElement(C,null))))}}}]);