(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{230:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),u=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=u(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=u(n),f=r,p=m["".concat(o,".").concat(f)]||m[f]||d[f]||c;return n?a.a.createElement(p,i(i({ref:t},s),{},{components:n})):a.a.createElement(p,i({ref:t},s))}));f.displayName="MDXCreateElement"},235:function(e,t,n){"use strict";var r=n(3),a=n(0),c=n.n(a),o=n(195),i=n(199),l=n(7),s=n(173),u=n(189),m=(n(57),n(58)),d=n.n(m),f=function(e){return function(t){var n,r=t.id,a=Object(l.a)(t,["id"]),o=Object(u.useThemeConfig)().navbar.hideOnScroll;return r?c.a.createElement(e,a,c.a.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:Object(s.a)("anchor",(n={},n[d.a.enhancedAnchor]=!o,n)),id:r}),a.children,c.a.createElement("a",{className:"hash-link",href:"#"+r,title:"Direct link to heading"},"#")):c.a.createElement(e,a)}},p=n(59),h=n.n(p),v={code:function(e){var t=e.children;return"string"==typeof t?t.includes("\n")?c.a.createElement(i.a,e):c.a.createElement("code",e):t},a:function(e){return c.a.createElement(o.a,e)},pre:function(e){return c.a.createElement("div",Object(r.a)({className:h.a.mdxCodeBlock},e))},h1:f("h1"),h2:f("h2"),h3:f("h3"),h4:f("h4"),h5:f("h5"),h6:f("h6")};t.a=v},245:function(e,t,n){"use strict";var r=n(0),a=n.n(r),c=n(173);var o=function(e,t,n){var a=Object(r.useState)(void 0),c=a[0],o=a[1];Object(r.useEffect)((function(){function r(){var r=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=n}));if(t){if(t.getBoundingClientRect().top>=n){var r=e[e.indexOf(t)-1];return null!=r?r:t}return t}return e[e.length-1]}();if(r)for(var a=0,i=!1,l=document.getElementsByClassName(e);a<l.length&&!i;){var s=l[a],u=s.href,m=decodeURIComponent(u.substring(u.indexOf("#")+1));r.id===m&&(c&&c.classList.remove(t),s.classList.add(t),o(s),i=!0),a+=1}}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),function(){document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}))},i=n(61),l=n.n(i),s="table-of-contents__link";function u(e){var t=e.headings,n=e.isChild;return t.length?a.a.createElement("ul",{className:n?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return a.a.createElement("li",{key:e.id},a.a.createElement("a",{href:"#"+e.id,className:s,dangerouslySetInnerHTML:{__html:e.value}}),a.a.createElement(u,{isChild:!0,headings:e.children}))}))):null}t.a=function(e){var t=e.headings;return o(s,"table-of-contents__link--active",100),a.a.createElement("div",{className:Object(c.a)(l.a.tableOfContents,"thin-scrollbar")},a.a.createElement(u,{headings:t}))}},82:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(226),o=n(230),i=n(235),l=n(245);t.default=function(e){var t=e.content,n=t.frontMatter,r=t.metadata,s=n.title,u=n.description,m=n.wrapperClassName,d=n.hide_table_of_contents,f=r.permalink;return a.a.createElement(c.a,{title:s,description:u,permalink:f,wrapperClassName:m},a.a.createElement("main",null,a.a.createElement("div",{className:"container container--fluid"},a.a.createElement("div",{className:"margin-vert--lg padding-vert--lg"},a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col col--8 col--offset-2"},a.a.createElement("div",{className:"container"},a.a.createElement(o.a,{components:i.a},a.a.createElement(t,null)))),!d&&t.rightToc&&a.a.createElement("div",{className:"col col--2"},a.a.createElement(l.a,{headings:t.rightToc})))))))}}}]);