(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{78:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=(t(79),t(109)),c=(t(87),t(22)),s=(t(88),t(74),t(75),t(128)),i=t.n(s);function u(e){var a=e.code,t=e.language;return Object(n.useEffect)((function(){i.a.highlightAll()}),[]),r.a.createElement("div",{className:"code"},r.a.createElement("pre",null,r.a.createElement("code",{className:"language-"+t},a)))}var m=t(116),o=t(210),g=t(211),d=t(214),E=t(202),f=t(208),h=t(218),v=t(209),p=t(219),b=t(216),j=t(166),O=Object(E.a)((function(e){return{root:{display:"flex"},formControl:{margin:e.spacing(3),width:"100%"}}})),N=function(e){var a=e.filters,t=e.onChange,n={language:a.language.reduce((function(e,a){var t;return Object.assign({},e,((t={})[a]=!1,t))}),{}),tags:a.tags.reduce((function(e,a){var t;return Object.assign({},e,((t={})[a]=!1,t))}),{})},l=O(),c=r.a.useState(n),s=c[0],i=c[1],u=s.tags,m=s.language,o=function(e){var a,n={language:s.language,tags:Object.assign({},s.tags,(a={},a[e.target.name]=e.target.checked,a))};t(n),i(n)},g=function(e){var a,n={tags:s.tags,language:Object.assign({},s.language,(a={},a[e.target.name]=e.target.checked,a))};t(n),i(n)};return r.a.createElement("div",null,r.a.createElement(h.a,{component:"fieldset",className:l.formControl},r.a.createElement(f.a,{component:"legend"},r.a.createElement("h3",null,"Language")),r.a.createElement(v.a,null,Object.entries(n.language).map((function(e){return r.a.createElement(p.a,{control:r.a.createElement(b.a,{checked:m[e[0]],onChange:g,name:e[0]}),label:e[0]})})))),r.a.createElement(h.a,{component:"fieldset",className:l.formControl},r.a.createElement(f.a,{component:"legend"},r.a.createElement("h3",null,"Tags")),r.a.createElement(v.a,null,Object.entries(n.tags).map((function(e){return r.a.createElement(p.a,{control:r.a.createElement(b.a,{checked:u[e[0]],onChange:o,name:e[0]}),label:e[0]})})))))},y=function(e){var a=e.textAreaId,t="COPY TO CLIPBOARD",l=Object(n.useState)(t),c=l[0],s=l[1];return r.a.createElement("div",null,r.a.createElement(o.a,{variant:"contained",color:"primary",className:"search-result-copy",onClick:function(e){return n=a,(r=document.querySelector("#"+n)).classList.remove("hidden"),r.select(),document.execCommand("copy"),s("COPIED!"),r.classList.add("hidden"),void setTimeout((function(){s(t)}),1e3);var n,r}},c))},C=function(e){var a=function(e){var a=e.split("\n");a.shift();var t=a[0].match(/^\s*/)[0],n=new RegExp("^"+t,"g");return"({"+a.map((function(e){return e.replace(n,"")})).join("\n")+"}).l"},t=e.results.map((function(e){return r.a.createElement(g.a,{className:"main-card mdc-elevation--z10"},r.a.createElement("div",{className:"search-result"},r.a.createElement("div",null,r.a.createElement("h2",null,r.a.createElement("span",{className:"search-result-name"},e.name))),r.a.createElement("div",null,r.a.createElement("h4",null,e.title),r.a.createElement("p",null,e.description),"CPGQL Query:",r.a.createElement(u,{language:"js",code:a(e.traversalAsString),queryName:e.name}),r.a.createElement("textarea",{className:"hidden",value:a(e.traversalAsString),id:e.name})),r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-author"},"author: ",e.author)),r.a.createElement("div",null,r.a.createElement("span",{className:"search-result-tags"},"tags: ",e.tags.join(","))),r.a.createElement(y,{textAreaId:e.name})))}));return r.a.createElement("div",null,t)},k=function(){var e=Object(m.usePluginData)("staticcode"),a=j(e.qdb,{sortings:{name_asc:{field:"name",order:"asc"}},aggregations:{tags:{title:"Tags",size:20,conjunction:!1},language:{title:"Language",size:20,conjunction:!1}},searchableFields:["name","title","description","tags"]}),t=a.search({per_page:100,sort:"name_asc"}).data,l=t.aggregations,c={language:l.language.buckets.map((function(e){return e.key})),tags:l.tags.buckets.map((function(e){return e.key}))},s=Object(n.useState)({results:t.items}),u=s[0],o=s[1],g=Object(n.useState)({language:[],tags:[]}),E=g[0],f=g[1],h=Object(n.useState)(""),v=h[0],p=h[1],b=function(e,t){var n={per_page:100,sort:"name_asc",query:v,filters:t},r=a.search(n);o({results:r.data.items}),setTimeout((function(){i.a.highlightAll()}),50)};return r.a.createElement("div",{className:"search-wrapper"},r.a.createElement("div",{className:"filler"}),r.a.createElement("div",{className:"search"},r.a.createElement("div",{className:"search-facets"},r.a.createElement(N,{filters:c,onChange:function(e){var a={tags:Object.keys(e.tags).filter((function(a){return e.tags[a]})),language:Object.keys(e.language).filter((function(a){return e.language[a]}))};f(a),b(v,a)}})),r.a.createElement("div",{className:"search-input"},r.a.createElement("div",{className:"search-field"},r.a.createElement(d.a,{id:"standard-basic",label:"Search for queries...",variant:"outlined",margin:"normal",fullWidth:!0,color:"primary",onChange:function(e){b(e.target.value,E),p(e.target.value)}})),r.a.createElement("div",{className:"search-results"},r.a.createElement(C,{results:u.results})))))},w=t(174),S=t(213),A=Object(w.a)({palette:{type:"dark",primary:{main:"#4ec001"},secondary:{main:"#4ec001"}}});a.default=function(){var e=Object(c.default)().siteConfig,a=void 0===e?{}:e;return r.a.createElement(S.a,{theme:A},r.a.createElement(l.a,{title:""+a.title,description:"Joern Query Database"},r.a.createElement("main",null,r.a.createElement("section",{className:"search-section"},r.a.createElement(k,null)))))}}}]);