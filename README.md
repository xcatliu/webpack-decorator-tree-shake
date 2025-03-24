# webpack-decorator-tree-shake

Try to shake decorator in webpack build

Stackoverflow link: https://stackoverflow.com/questions/79531083/is-there-a-way-to-tree-shake-decorator-in-webpack-build

Please run `npm install && npm run build` in this repo.

```ts
// src/index.ts

import { add } from './math';

(window as any).add = add;
```

```ts
// src/math.ts

export function add(a, b) {
  return a + b;
}

function sealed(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

/*#__PURE__*/
@sealed
class Foo {
  sub() {
    console.log("hello");
  }
}
```

In this case, `class Foo` is not imported or used in index.ts

However, the built result `dist/bundle.js` has the code `console.log("hello")`:

```js
(()=>{"use strict";var e=function(e,t,n,o,r,c){function a(e){if(void 0!==e&&"function"!=typeof e)throw new TypeError("Function expected");return e}for(var i,l=o.kind,u="getter"===l?"get":"setter"===l?"set":"value",s=!t&&e?o.static?e:e.prototype:null,f=t||(s?Object.getOwnPropertyDescriptor(s,o.name):{}),d=!1,p=n.length-1;p>=0;p--){var b={};for(var y in o)b[y]="access"===y?{}:o[y];for(var y in o.access)b.access[y]=o.access[y];b.addInitializer=function(e){if(d)throw new TypeError("Cannot add initializers after decoration has completed");c.push(a(e||null))};var v=(0,n[p])("accessor"===l?{get:f.get,set:f.set}:f[u],b);if("accessor"===l){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw new TypeError("Object expected");(i=a(v.get))&&(f.get=i),(i=a(v.set))&&(f.set=i),(i=a(v.init))&&r.unshift(i)}else(i=a(v))&&("field"===l?r.unshift(i):f[u]=i)}s&&Object.defineProperty(s,o.name,f),d=!0},t=function(e,t,n){for(var o=arguments.length>2,r=0;r<t.length;r++)n=o?t[r].call(e,n):t[r].call(e);return o?n:void 0},n=function(e,t,n){return"symbol"==typeof t&&(t=t.description?"[".concat(t.description,"]"):""),Object.defineProperty(e,"name",{configurable:!0,value:n?"".concat(n," ",t):t})};function o(e){Object.seal(e),Object.seal(e.prototype)}!function(){var r,c,a,i=[o],l=[];c=function(){function e(){}return e.prototype.sub=function(){console.log("hello")},e}();n(c,"Foo"),a="function"==typeof Symbol&&Symbol.metadata?Object.create(null):void 0,e(null,r={value:c},i,{kind:"class",name:c.name,metadata:a},null,l),c=r.value,a&&Object.defineProperty(c,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:a}),t(c,l)}();window.add=function(e,t){return e+t}})();
```

Is there a way to tree-shake decorator in webpack build?

Related issue:
- https://github.com/evanw/esbuild/issues/649
- https://www.npmjs.com/package/vite-plugin-tree-shakable-decorators
- https://webpack.js.org/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects

Vite seems to have a plugin to do this but webpack haven't.

