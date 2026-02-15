import { g as getDefaultExportFromCjs } from "./page-builder.js";
import { r as requireCodemirror } from "./codemirror3.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var codemirrorExports = requireCodemirror();
const codemirror = /* @__PURE__ */ getDefaultExportFromCjs(codemirrorExports);
const codemirror$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: codemirror
}, [codemirrorExports]);
export {
  codemirror$1 as c
};
//# sourceMappingURL=codemirror.js.map
