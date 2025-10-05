import { g as getDefaultExportFromCjs } from "../page-builder.js";
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
var closebrackets$2 = { exports: {} };
var hasRequiredClosebrackets;
function requireClosebrackets() {
  if (hasRequiredClosebrackets) return closebrackets$2.exports;
  hasRequiredClosebrackets = 1;
  (function(module, exports) {
    (function(mod) {
      mod(requireCodemirror());
    })(function(CodeMirror) {
      var defaults = {
        pairs: `()[]{}''""`,
        closeBefore: `)]}'":;>`,
        triples: "",
        explode: "[]{}"
      };
      var Pos = CodeMirror.Pos;
      CodeMirror.defineOption("autoCloseBrackets", false, function(cm, val, old) {
        if (old && old != CodeMirror.Init) {
          cm.removeKeyMap(keyMap);
          cm.state.closeBrackets = null;
        }
        if (val) {
          ensureBound(getOption(val, "pairs"));
          cm.state.closeBrackets = val;
          cm.addKeyMap(keyMap);
        }
      });
      function getOption(conf, name) {
        if (name == "pairs" && typeof conf == "string") return conf;
        if (typeof conf == "object" && conf[name] != null) return conf[name];
        return defaults[name];
      }
      var keyMap = { Backspace: handleBackspace, Enter: handleEnter };
      function ensureBound(chars) {
        for (var i = 0; i < chars.length; i++) {
          var ch = chars.charAt(i), key = "'" + ch + "'";
          if (!keyMap[key]) keyMap[key] = handler(ch);
        }
      }
      ensureBound(defaults.pairs + "`");
      function handler(ch) {
        return function(cm) {
          return handleChar(cm, ch);
        };
      }
      function getConfig(cm) {
        var deflt = cm.state.closeBrackets;
        if (!deflt || deflt.override) return deflt;
        var mode = cm.getModeAt(cm.getCursor());
        return mode.closeBrackets || deflt;
      }
      function handleBackspace(cm) {
        var conf = getConfig(cm);
        if (!conf || cm.getOption("disableInput")) return CodeMirror.Pass;
        var pairs = getOption(conf, "pairs");
        var ranges = cm.listSelections();
        for (var i = 0; i < ranges.length; i++) {
          if (!ranges[i].empty()) return CodeMirror.Pass;
          var around = charsAround(cm, ranges[i].head);
          if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
        }
        for (var i = ranges.length - 1; i >= 0; i--) {
          var cur = ranges[i].head;
          cm.replaceRange("", Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1), "+delete");
        }
      }
      function handleEnter(cm) {
        var conf = getConfig(cm);
        var explode = conf && getOption(conf, "explode");
        if (!explode || cm.getOption("disableInput")) return CodeMirror.Pass;
        var ranges = cm.listSelections();
        for (var i = 0; i < ranges.length; i++) {
          if (!ranges[i].empty()) return CodeMirror.Pass;
          var around = charsAround(cm, ranges[i].head);
          if (!around || explode.indexOf(around) % 2 != 0) return CodeMirror.Pass;
        }
        cm.operation(function() {
          var linesep = cm.lineSeparator() || "\n";
          cm.replaceSelection(linesep + linesep, null);
          moveSel(cm, -1);
          ranges = cm.listSelections();
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var line = ranges[i2].head.line;
            cm.indentLine(line, null, true);
            cm.indentLine(line + 1, null, true);
          }
        });
      }
      function moveSel(cm, dir) {
        var newRanges = [], ranges = cm.listSelections(), primary = 0;
        for (var i = 0; i < ranges.length; i++) {
          var range = ranges[i];
          if (range.head == cm.getCursor()) primary = i;
          var pos = range.head.ch || dir > 0 ? { line: range.head.line, ch: range.head.ch + dir } : { line: range.head.line - 1 };
          newRanges.push({ anchor: pos, head: pos });
        }
        cm.setSelections(newRanges, primary);
      }
      function contractSelection(sel) {
        var inverted = CodeMirror.cmpPos(sel.anchor, sel.head) > 0;
        return {
          anchor: new Pos(sel.anchor.line, sel.anchor.ch + (inverted ? -1 : 1)),
          head: new Pos(sel.head.line, sel.head.ch + (inverted ? 1 : -1))
        };
      }
      function handleChar(cm, ch) {
        var conf = getConfig(cm);
        if (!conf || cm.getOption("disableInput")) return CodeMirror.Pass;
        var pairs = getOption(conf, "pairs");
        var pos = pairs.indexOf(ch);
        if (pos == -1) return CodeMirror.Pass;
        var closeBefore = getOption(conf, "closeBefore");
        var triples = getOption(conf, "triples");
        var identical = pairs.charAt(pos + 1) == ch;
        var ranges = cm.listSelections();
        var opening = pos % 2 == 0;
        var type;
        for (var i = 0; i < ranges.length; i++) {
          var range = ranges[i], cur = range.head, curType;
          var next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
          if (opening && !range.empty()) {
            curType = "surround";
          } else if ((identical || !opening) && next == ch) {
            if (identical && stringStartsAfter(cm, cur))
              curType = "both";
            else if (triples.indexOf(ch) >= 0 && cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == ch + ch + ch)
              curType = "skipThree";
            else
              curType = "skip";
          } else if (identical && cur.ch > 1 && triples.indexOf(ch) >= 0 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == ch + ch) {
            if (cur.ch > 2 && /\bstring/.test(cm.getTokenTypeAt(Pos(cur.line, cur.ch - 2)))) return CodeMirror.Pass;
            curType = "addFour";
          } else if (identical) {
            var prev = cur.ch == 0 ? " " : cm.getRange(Pos(cur.line, cur.ch - 1), cur);
            if (!CodeMirror.isWordChar(next) && prev != ch && !CodeMirror.isWordChar(prev)) curType = "both";
            else return CodeMirror.Pass;
          } else if (opening && (next.length === 0 || /\s/.test(next) || closeBefore.indexOf(next) > -1)) {
            curType = "both";
          } else {
            return CodeMirror.Pass;
          }
          if (!type) type = curType;
          else if (type != curType) return CodeMirror.Pass;
        }
        var left = pos % 2 ? pairs.charAt(pos - 1) : ch;
        var right = pos % 2 ? ch : pairs.charAt(pos + 1);
        cm.operation(function() {
          if (type == "skip") {
            moveSel(cm, 1);
          } else if (type == "skipThree") {
            moveSel(cm, 3);
          } else if (type == "surround") {
            var sels = cm.getSelections();
            for (var i2 = 0; i2 < sels.length; i2++)
              sels[i2] = left + sels[i2] + right;
            cm.replaceSelections(sels, "around");
            sels = cm.listSelections().slice();
            for (var i2 = 0; i2 < sels.length; i2++)
              sels[i2] = contractSelection(sels[i2]);
            cm.setSelections(sels);
          } else if (type == "both") {
            cm.replaceSelection(left + right, null);
            cm.triggerElectric(left + right);
            moveSel(cm, -1);
          } else if (type == "addFour") {
            cm.replaceSelection(left + left + left + left, "before");
            moveSel(cm, 1);
          }
        });
      }
      function charsAround(cm, pos) {
        var str = cm.getRange(
          Pos(pos.line, pos.ch - 1),
          Pos(pos.line, pos.ch + 1)
        );
        return str.length == 2 ? str : null;
      }
      function stringStartsAfter(cm, pos) {
        var token = cm.getTokenAt(Pos(pos.line, pos.ch + 1));
        return /\bstring/.test(token.type) && token.start == pos.ch && (pos.ch == 0 || !/\bstring/.test(cm.getTokenTypeAt(pos)));
      }
    });
  })();
  return closebrackets$2.exports;
}
var closebracketsExports = requireClosebrackets();
const closebrackets = /* @__PURE__ */ getDefaultExportFromCjs(closebracketsExports);
const closebrackets$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: closebrackets
}, [closebracketsExports]);
export {
  closebrackets$1 as c
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VicmFja2V0cy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL2NvZGVtaXJyb3IvYWRkb24vZWRpdC9jbG9zZWJyYWNrZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBhbiBNSVQgbGljZW5zZTogaHR0cHM6Ly9jb2RlbWlycm9yLm5ldC81L0xJQ0VOU0VcblxuKGZ1bmN0aW9uKG1vZCkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIpIC8vIENvbW1vbkpTXG4gICAgbW9kKHJlcXVpcmUoXCIuLi8uLi9saWIvY29kZW1pcnJvclwiKSk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIC8vIEFNRFxuICAgIGRlZmluZShbXCIuLi8uLi9saWIvY29kZW1pcnJvclwiXSwgbW9kKTtcbiAgZWxzZSAvLyBQbGFpbiBicm93c2VyIGVudlxuICAgIG1vZChDb2RlTWlycm9yKTtcbn0pKGZ1bmN0aW9uKENvZGVNaXJyb3IpIHtcbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIHBhaXJzOiBcIigpW117fScnXFxcIlxcXCJcIixcbiAgICBjbG9zZUJlZm9yZTogXCIpXX0nXFxcIjo7PlwiLFxuICAgIHRyaXBsZXM6IFwiXCIsXG4gICAgZXhwbG9kZTogXCJbXXt9XCJcbiAgfTtcblxuICB2YXIgUG9zID0gQ29kZU1pcnJvci5Qb3M7XG5cbiAgQ29kZU1pcnJvci5kZWZpbmVPcHRpb24oXCJhdXRvQ2xvc2VCcmFja2V0c1wiLCBmYWxzZSwgZnVuY3Rpb24oY20sIHZhbCwgb2xkKSB7XG4gICAgaWYgKG9sZCAmJiBvbGQgIT0gQ29kZU1pcnJvci5Jbml0KSB7XG4gICAgICBjbS5yZW1vdmVLZXlNYXAoa2V5TWFwKTtcbiAgICAgIGNtLnN0YXRlLmNsb3NlQnJhY2tldHMgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodmFsKSB7XG4gICAgICBlbnN1cmVCb3VuZChnZXRPcHRpb24odmFsLCBcInBhaXJzXCIpKVxuICAgICAgY20uc3RhdGUuY2xvc2VCcmFja2V0cyA9IHZhbDtcbiAgICAgIGNtLmFkZEtleU1hcChrZXlNYXApO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uKGNvbmYsIG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PSBcInBhaXJzXCIgJiYgdHlwZW9mIGNvbmYgPT0gXCJzdHJpbmdcIikgcmV0dXJuIGNvbmY7XG4gICAgaWYgKHR5cGVvZiBjb25mID09IFwib2JqZWN0XCIgJiYgY29uZltuYW1lXSAhPSBudWxsKSByZXR1cm4gY29uZltuYW1lXTtcbiAgICByZXR1cm4gZGVmYXVsdHNbbmFtZV07XG4gIH1cblxuICB2YXIga2V5TWFwID0ge0JhY2tzcGFjZTogaGFuZGxlQmFja3NwYWNlLCBFbnRlcjogaGFuZGxlRW50ZXJ9O1xuICBmdW5jdGlvbiBlbnN1cmVCb3VuZChjaGFycykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaCA9IGNoYXJzLmNoYXJBdChpKSwga2V5ID0gXCInXCIgKyBjaCArIFwiJ1wiXG4gICAgICBpZiAoIWtleU1hcFtrZXldKSBrZXlNYXBba2V5XSA9IGhhbmRsZXIoY2gpXG4gICAgfVxuICB9XG4gIGVuc3VyZUJvdW5kKGRlZmF1bHRzLnBhaXJzICsgXCJgXCIpXG5cbiAgZnVuY3Rpb24gaGFuZGxlcihjaCkge1xuICAgIHJldHVybiBmdW5jdGlvbihjbSkgeyByZXR1cm4gaGFuZGxlQ2hhcihjbSwgY2gpOyB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29uZmlnKGNtKSB7XG4gICAgdmFyIGRlZmx0ID0gY20uc3RhdGUuY2xvc2VCcmFja2V0cztcbiAgICBpZiAoIWRlZmx0IHx8IGRlZmx0Lm92ZXJyaWRlKSByZXR1cm4gZGVmbHQ7XG4gICAgdmFyIG1vZGUgPSBjbS5nZXRNb2RlQXQoY20uZ2V0Q3Vyc29yKCkpO1xuICAgIHJldHVybiBtb2RlLmNsb3NlQnJhY2tldHMgfHwgZGVmbHQ7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVCYWNrc3BhY2UoY20pIHtcbiAgICB2YXIgY29uZiA9IGdldENvbmZpZyhjbSk7XG4gICAgaWYgKCFjb25mIHx8IGNtLmdldE9wdGlvbihcImRpc2FibGVJbnB1dFwiKSkgcmV0dXJuIENvZGVNaXJyb3IuUGFzcztcblxuICAgIHZhciBwYWlycyA9IGdldE9wdGlvbihjb25mLCBcInBhaXJzXCIpO1xuICAgIHZhciByYW5nZXMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXJhbmdlc1tpXS5lbXB0eSgpKSByZXR1cm4gQ29kZU1pcnJvci5QYXNzO1xuICAgICAgdmFyIGFyb3VuZCA9IGNoYXJzQXJvdW5kKGNtLCByYW5nZXNbaV0uaGVhZCk7XG4gICAgICBpZiAoIWFyb3VuZCB8fCBwYWlycy5pbmRleE9mKGFyb3VuZCkgJSAyICE9IDApIHJldHVybiBDb2RlTWlycm9yLlBhc3M7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSByYW5nZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjdXIgPSByYW5nZXNbaV0uaGVhZDtcbiAgICAgIGNtLnJlcGxhY2VSYW5nZShcIlwiLCBQb3MoY3VyLmxpbmUsIGN1ci5jaCAtIDEpLCBQb3MoY3VyLmxpbmUsIGN1ci5jaCArIDEpLCBcIitkZWxldGVcIik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRW50ZXIoY20pIHtcbiAgICB2YXIgY29uZiA9IGdldENvbmZpZyhjbSk7XG4gICAgdmFyIGV4cGxvZGUgPSBjb25mICYmIGdldE9wdGlvbihjb25mLCBcImV4cGxvZGVcIik7XG4gICAgaWYgKCFleHBsb2RlIHx8IGNtLmdldE9wdGlvbihcImRpc2FibGVJbnB1dFwiKSkgcmV0dXJuIENvZGVNaXJyb3IuUGFzcztcblxuICAgIHZhciByYW5nZXMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXJhbmdlc1tpXS5lbXB0eSgpKSByZXR1cm4gQ29kZU1pcnJvci5QYXNzO1xuICAgICAgdmFyIGFyb3VuZCA9IGNoYXJzQXJvdW5kKGNtLCByYW5nZXNbaV0uaGVhZCk7XG4gICAgICBpZiAoIWFyb3VuZCB8fCBleHBsb2RlLmluZGV4T2YoYXJvdW5kKSAlIDIgIT0gMCkgcmV0dXJuIENvZGVNaXJyb3IuUGFzcztcbiAgICB9XG4gICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxpbmVzZXAgPSBjbS5saW5lU2VwYXJhdG9yKCkgfHwgXCJcXG5cIjtcbiAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb24obGluZXNlcCArIGxpbmVzZXAsIG51bGwpO1xuICAgICAgbW92ZVNlbChjbSwgLTEpXG4gICAgICByYW5nZXMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSByYW5nZXNbaV0uaGVhZC5saW5lO1xuICAgICAgICBjbS5pbmRlbnRMaW5lKGxpbmUsIG51bGwsIHRydWUpO1xuICAgICAgICBjbS5pbmRlbnRMaW5lKGxpbmUgKyAxLCBudWxsLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmVTZWwoY20sIGRpcikge1xuICAgIHZhciBuZXdSYW5nZXMgPSBbXSwgcmFuZ2VzID0gY20ubGlzdFNlbGVjdGlvbnMoKSwgcHJpbWFyeSA9IDBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJhbmdlID0gcmFuZ2VzW2ldXG4gICAgICBpZiAocmFuZ2UuaGVhZCA9PSBjbS5nZXRDdXJzb3IoKSkgcHJpbWFyeSA9IGlcbiAgICAgIHZhciBwb3MgPSByYW5nZS5oZWFkLmNoIHx8IGRpciA+IDAgPyB7bGluZTogcmFuZ2UuaGVhZC5saW5lLCBjaDogcmFuZ2UuaGVhZC5jaCArIGRpcn0gOiB7bGluZTogcmFuZ2UuaGVhZC5saW5lIC0gMX1cbiAgICAgIG5ld1Jhbmdlcy5wdXNoKHthbmNob3I6IHBvcywgaGVhZDogcG9zfSlcbiAgICB9XG4gICAgY20uc2V0U2VsZWN0aW9ucyhuZXdSYW5nZXMsIHByaW1hcnkpXG4gIH1cblxuICBmdW5jdGlvbiBjb250cmFjdFNlbGVjdGlvbihzZWwpIHtcbiAgICB2YXIgaW52ZXJ0ZWQgPSBDb2RlTWlycm9yLmNtcFBvcyhzZWwuYW5jaG9yLCBzZWwuaGVhZCkgPiAwO1xuICAgIHJldHVybiB7YW5jaG9yOiBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgc2VsLmFuY2hvci5jaCArIChpbnZlcnRlZCA/IC0xIDogMSkpLFxuICAgICAgICAgICAgaGVhZDogbmV3IFBvcyhzZWwuaGVhZC5saW5lLCBzZWwuaGVhZC5jaCArIChpbnZlcnRlZCA/IDEgOiAtMSkpfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNoYXIoY20sIGNoKSB7XG4gICAgdmFyIGNvbmYgPSBnZXRDb25maWcoY20pO1xuICAgIGlmICghY29uZiB8fCBjbS5nZXRPcHRpb24oXCJkaXNhYmxlSW5wdXRcIikpIHJldHVybiBDb2RlTWlycm9yLlBhc3M7XG5cbiAgICB2YXIgcGFpcnMgPSBnZXRPcHRpb24oY29uZiwgXCJwYWlyc1wiKTtcbiAgICB2YXIgcG9zID0gcGFpcnMuaW5kZXhPZihjaCk7XG4gICAgaWYgKHBvcyA9PSAtMSkgcmV0dXJuIENvZGVNaXJyb3IuUGFzcztcblxuICAgIHZhciBjbG9zZUJlZm9yZSA9IGdldE9wdGlvbihjb25mLFwiY2xvc2VCZWZvcmVcIik7XG5cbiAgICB2YXIgdHJpcGxlcyA9IGdldE9wdGlvbihjb25mLCBcInRyaXBsZXNcIik7XG5cbiAgICB2YXIgaWRlbnRpY2FsID0gcGFpcnMuY2hhckF0KHBvcyArIDEpID09IGNoO1xuICAgIHZhciByYW5nZXMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgIHZhciBvcGVuaW5nID0gcG9zICUgMiA9PSAwO1xuXG4gICAgdmFyIHR5cGU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByYW5nZSA9IHJhbmdlc1tpXSwgY3VyID0gcmFuZ2UuaGVhZCwgY3VyVHlwZTtcbiAgICAgIHZhciBuZXh0ID0gY20uZ2V0UmFuZ2UoY3VyLCBQb3MoY3VyLmxpbmUsIGN1ci5jaCArIDEpKTtcbiAgICAgIGlmIChvcGVuaW5nICYmICFyYW5nZS5lbXB0eSgpKSB7XG4gICAgICAgIGN1clR5cGUgPSBcInN1cnJvdW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKChpZGVudGljYWwgfHwgIW9wZW5pbmcpICYmIG5leHQgPT0gY2gpIHtcbiAgICAgICAgaWYgKGlkZW50aWNhbCAmJiBzdHJpbmdTdGFydHNBZnRlcihjbSwgY3VyKSlcbiAgICAgICAgICBjdXJUeXBlID0gXCJib3RoXCI7XG4gICAgICAgIGVsc2UgaWYgKHRyaXBsZXMuaW5kZXhPZihjaCkgPj0gMCAmJiBjbS5nZXRSYW5nZShjdXIsIFBvcyhjdXIubGluZSwgY3VyLmNoICsgMykpID09IGNoICsgY2ggKyBjaClcbiAgICAgICAgICBjdXJUeXBlID0gXCJza2lwVGhyZWVcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGN1clR5cGUgPSBcInNraXBcIjtcbiAgICAgIH0gZWxzZSBpZiAoaWRlbnRpY2FsICYmIGN1ci5jaCA+IDEgJiYgdHJpcGxlcy5pbmRleE9mKGNoKSA+PSAwICYmXG4gICAgICAgICAgICAgICAgIGNtLmdldFJhbmdlKFBvcyhjdXIubGluZSwgY3VyLmNoIC0gMiksIGN1cikgPT0gY2ggKyBjaCkge1xuICAgICAgICBpZiAoY3VyLmNoID4gMiAmJiAvXFxic3RyaW5nLy50ZXN0KGNtLmdldFRva2VuVHlwZUF0KFBvcyhjdXIubGluZSwgY3VyLmNoIC0gMikpKSkgcmV0dXJuIENvZGVNaXJyb3IuUGFzcztcbiAgICAgICAgY3VyVHlwZSA9IFwiYWRkRm91clwiO1xuICAgICAgfSBlbHNlIGlmIChpZGVudGljYWwpIHtcbiAgICAgICAgdmFyIHByZXYgPSBjdXIuY2ggPT0gMCA/IFwiIFwiIDogY20uZ2V0UmFuZ2UoUG9zKGN1ci5saW5lLCBjdXIuY2ggLSAxKSwgY3VyKVxuICAgICAgICBpZiAoIUNvZGVNaXJyb3IuaXNXb3JkQ2hhcihuZXh0KSAmJiBwcmV2ICE9IGNoICYmICFDb2RlTWlycm9yLmlzV29yZENoYXIocHJldikpIGN1clR5cGUgPSBcImJvdGhcIjtcbiAgICAgICAgZWxzZSByZXR1cm4gQ29kZU1pcnJvci5QYXNzO1xuICAgICAgfSBlbHNlIGlmIChvcGVuaW5nICYmIChuZXh0Lmxlbmd0aCA9PT0gMCB8fCAvXFxzLy50ZXN0KG5leHQpIHx8IGNsb3NlQmVmb3JlLmluZGV4T2YobmV4dCkgPiAtMSkpIHtcbiAgICAgICAgY3VyVHlwZSA9IFwiYm90aFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvZGVNaXJyb3IuUGFzcztcbiAgICAgIH1cbiAgICAgIGlmICghdHlwZSkgdHlwZSA9IGN1clR5cGU7XG4gICAgICBlbHNlIGlmICh0eXBlICE9IGN1clR5cGUpIHJldHVybiBDb2RlTWlycm9yLlBhc3M7XG4gICAgfVxuXG4gICAgdmFyIGxlZnQgPSBwb3MgJSAyID8gcGFpcnMuY2hhckF0KHBvcyAtIDEpIDogY2g7XG4gICAgdmFyIHJpZ2h0ID0gcG9zICUgMiA/IGNoIDogcGFpcnMuY2hhckF0KHBvcyArIDEpO1xuICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0eXBlID09IFwic2tpcFwiKSB7XG4gICAgICAgIG1vdmVTZWwoY20sIDEpXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJza2lwVGhyZWVcIikge1xuICAgICAgICBtb3ZlU2VsKGNtLCAzKVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09IFwic3Vycm91bmRcIikge1xuICAgICAgICB2YXIgc2VscyA9IGNtLmdldFNlbGVjdGlvbnMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIHNlbHNbaV0gPSBsZWZ0ICsgc2Vsc1tpXSArIHJpZ2h0O1xuICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhzZWxzLCBcImFyb3VuZFwiKTtcbiAgICAgICAgc2VscyA9IGNtLmxpc3RTZWxlY3Rpb25zKCkuc2xpY2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgIHNlbHNbaV0gPSBjb250cmFjdFNlbGVjdGlvbihzZWxzW2ldKTtcbiAgICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWxzKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcImJvdGhcIikge1xuICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKGxlZnQgKyByaWdodCwgbnVsbCk7XG4gICAgICAgIGNtLnRyaWdnZXJFbGVjdHJpYyhsZWZ0ICsgcmlnaHQpO1xuICAgICAgICBtb3ZlU2VsKGNtLCAtMSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcImFkZEZvdXJcIikge1xuICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKGxlZnQgKyBsZWZ0ICsgbGVmdCArIGxlZnQsIFwiYmVmb3JlXCIpO1xuICAgICAgICBtb3ZlU2VsKGNtLCAxKVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhcnNBcm91bmQoY20sIHBvcykge1xuICAgIHZhciBzdHIgPSBjbS5nZXRSYW5nZShQb3MocG9zLmxpbmUsIHBvcy5jaCAtIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBQb3MocG9zLmxpbmUsIHBvcy5jaCArIDEpKTtcbiAgICByZXR1cm4gc3RyLmxlbmd0aCA9PSAyID8gc3RyIDogbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ1N0YXJ0c0FmdGVyKGNtLCBwb3MpIHtcbiAgICB2YXIgdG9rZW4gPSBjbS5nZXRUb2tlbkF0KFBvcyhwb3MubGluZSwgcG9zLmNoICsgMSkpXG4gICAgcmV0dXJuIC9cXGJzdHJpbmcvLnRlc3QodG9rZW4udHlwZSkgJiYgdG9rZW4uc3RhcnQgPT0gcG9zLmNoICYmXG4gICAgICAocG9zLmNoID09IDAgfHwgIS9cXGJzdHJpbmcvLnRlc3QoY20uZ2V0VG9rZW5UeXBlQXQocG9zKSkpXG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxLQUFDLFNBQVMsS0FBSztBQUVYLFVBQUlBLGtCQUFBLENBQStCO0FBQUEsSUFLdkMsR0FBRyxTQUFTLFlBQVk7QUFDdEIsVUFBSSxXQUFXO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUE7QUFHWCxVQUFJLE1BQU0sV0FBVztBQUVyQixpQkFBVyxhQUFhLHFCQUFxQixPQUFPLFNBQVMsSUFBSSxLQUFLLEtBQUs7QUFDekUsWUFBSSxPQUFPLE9BQU8sV0FBVyxNQUFNO0FBQ2pDLGFBQUcsYUFBYSxNQUFNO0FBQ3RCLGFBQUcsTUFBTSxnQkFBZ0I7QUFBQSxRQUMvQjtBQUNJLFlBQUksS0FBSztBQUNQLHNCQUFZLFVBQVUsS0FBSyxPQUFPLENBQUM7QUFDbkMsYUFBRyxNQUFNLGdCQUFnQjtBQUN6QixhQUFHLFVBQVUsTUFBTTtBQUFBLFFBQ3pCO0FBQUEsTUFDQSxDQUFHO0FBRUQsZUFBUyxVQUFVLE1BQU0sTUFBTTtBQUM3QixZQUFJLFFBQVEsV0FBVyxPQUFPLFFBQVEsU0FB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
