import { stack } from "@lyrasoft/ts-toolkit/generic";
function isPlainObject(val) {
  return val && typeof val === "object" && !Array.isArray(val);
}
function mergeDeep(target, ...sources) {
  let out = isPlainObject(target) ? { ...target } : target;
  for (const source of sources) {
    if (Array.isArray(source)) {
      out = Array.isArray(out) ? out.concat(source) : source;
      continue;
    }
    if (isPlainObject(source)) {
      out = { ...isPlainObject(out) ? out : {} };
      for (const key of Object.keys(source)) {
        out[key] = key in out ? mergeDeep(out[key], source[key]) : source[key];
      }
      continue;
    }
    out = source;
  }
  return out;
}
function useScriptImport(src, attrs = {}) {
  const script = document.createElement("script");
  script.src = resolveUrl(src);
  for (const key in attrs) {
    script.setAttribute(key, attrs[key]);
  }
  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve();
      document.body.removeChild(script);
    };
    script.onerror = (e) => {
      reject(e);
      document.body.removeChild(script);
    };
    document.body.appendChild(script);
  });
}
let importMap;
function parseImportMap() {
  const importMapScript = document.querySelector('script[type="importmap"]');
  if (importMapScript) {
    try {
      return JSON.parse(importMapScript.textContent || "{}").imports || {};
    } catch (e) {
      console.error("Failed to parse import map:", e);
    }
  }
  return {};
}
function resolveUrl(specifier) {
  importMap ??= parseImportMap();
  for (const [prefix, target] of Object.entries(importMap)) {
    if (specifier === prefix) {
      return target;
    }
  }
  for (const [prefix, target] of Object.entries(importMap)) {
    if (specifier.startsWith(prefix)) {
      return specifier.replace(prefix, target);
    }
  }
  return specifier;
}
async function useHttpClient(config) {
  const { createHttpClient } = await import("./http-client.js");
  return createHttpClient(config);
}
const stacks = {};
function useStack(name = "default", store = []) {
  return stacks[name] ??= createStack(store);
}
function createStack(store = []) {
  return stack(store);
}
const instances = {};
let hooks = [];
let imported = false;
async function get(selector, options = {}) {
  return instances[selector] ??= await create(document.querySelector(selector), options);
}
async function create(selector, options = {}) {
  const tinymce2 = await loadTinymce();
  let el;
  if (typeof selector === "string") {
    el = document.querySelector(selector);
  } else {
    el = selector;
  }
  return new TinymceController(tinymce2, el, options);
}
function destroy(selector) {
  delete instances[selector];
}
function addHook(handler) {
  hooks.push(handler);
}
function clearHooks() {
  hooks = [];
}
async function loadTinymce() {
  if (imported) {
    return tinymce;
  }
  await useScriptImport("@tinymce");
  for (const hook of hooks) {
    hook(tinymce);
  }
  await registerDragPlugin(tinymce);
  imported = true;
  return tinymce;
}
const defaultOptions = {};
class TinymceController {
  constructor(tinymce2, element, options) {
    this.tinymce = tinymce2;
    this.element = element;
    this.options = {};
    options.target = element;
    this.options = mergeDeep(
      {
        unicorn: {
          stack_name: "uploading"
        }
      },
      defaultOptions,
      this.prepareOptions(options, tinymce2.majorVersion)
    );
    tinymce2.EditorManager.init(this.options).then((editor) => {
      this.editor = editor[0];
    });
  }
  prepareOptions(options, version = "6") {
    const defaults = {};
    if (options.images_upload_url) {
      defaults.paste_data_images = true;
      defaults.remove_script_host = false;
      defaults.relative_urls = false;
      if (Number(version) >= 6) {
        defaults.images_upload_handler = (blobInfo, progress) => this.imageUploadHandler(blobInfo, progress);
      } else {
        options.plugins.push("paste");
        defaults.images_upload_handler = (blobInfo, success, failure, progress) => this.imageUploadHandler(blobInfo, progress).then((url) => {
          success(url);
          return url;
        }).catch((e) => {
          failure(e.message, { remove: true });
          throw e;
        });
      }
    }
    defaults.plugins = defaults.plugins || [];
    defaults.setup = (editor) => {
      editor.on("change", () => {
        this.tinymce.triggerSave();
      });
    };
    options = mergeDeep({}, defaults, options);
    if (options.plugins.indexOf("unicorndragdrop") === -1) {
      options.plugins.push("unicorndragdrop");
    }
    return options;
  }
  insert(text) {
    this.editor?.insertContent(text);
  }
  getValue() {
    return this.editor?.getContent() ?? "";
  }
  setValue(text) {
    this.editor?.setContent(text);
  }
  // filePickerCallback(callback, value, meta) {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.style.display = 'none';
  //
  //   if (meta.filetype === 'image') {
  //     input.setAttribute('accept', `image/\*`);
  //   }
  //
  //   document.body.appendChild(input);
  //
  //   input.onchange = function () {
  //     const file = this.files[0];
  //
  //     const reader = new FileReader();
  //     reader.onload = function () {
  //       const id = 'blobid' + (new Date()).getTime();
  //       const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
  //       const base64 = reader.result.split(',')[1];
  //       const blobInfo = blobCache.create(id, file, base64);
  //       blobCache.add(blobInfo);
  //
  //       /* call the callback and populate the Title field with the file name */
  //       callback(blobInfo.blobUri(), { title: file.name, text: file.name });
  //     };
  //     reader.readAsDataURL(file);
  //     input.remove();
  //   };
  //
  //   input.click();
  // }
  async imageUploadHandler(blobInfo, progress) {
    const element = this.element;
    element.dispatchEvent(new CustomEvent("upload-start"));
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    const stack2 = useStack(this.options.unicorn.stack_name);
    stack2.push(true);
    const { post, isAxiosError } = await useHttpClient();
    try {
      let res = await post(
        this.options.images_upload_url,
        formData,
        {
          withCredentials: false,
          onUploadProgress: (e) => {
            progress(e.loaded / e.total * 100);
          }
        }
      );
      element.dispatchEvent(new CustomEvent("upload-success"));
      return res.data.data.url;
    } catch (err) {
      if (isAxiosError(err)) {
        const message = err?.response?.data?.message || err.message;
        console.error(err?.response?.data?.message || err.message, err);
        element.dispatchEvent(new CustomEvent("upload-error", { detail: err }));
        return Promise.reject({ message, remove: true });
      }
      throw err;
    } finally {
      element.dispatchEvent(new CustomEvent("upload-complete"));
      stack2.pop();
    }
  }
}
function registerDragPlugin(tinymce2) {
  tinymce2.PluginManager.add("unicorndragdrop", function(editor) {
    tinymce2.DOM.bind(document, "dragleave", function(e) {
      e.stopPropagation();
      e.preventDefault();
      if (tinymce2.activeEditor) {
        tinymce2.activeEditor.contentAreaContainer.style.transition = "all .3s";
        tinymce2.activeEditor.contentAreaContainer.style.borderWidth = "";
      }
      return false;
    });
    if (typeof FormData !== "undefined") {
      editor.on("dragenter", (e) => {
        e.stopPropagation();
        return false;
      });
      editor.on("dragover", (e) => {
        e.preventDefault();
        if (tinymce2.activeEditor) {
          tinymce2.activeEditor.contentAreaContainer.style.transition = "all .3s";
          tinymce2.activeEditor.contentAreaContainer.style.border = "3px dashed rgba(0, 0, 0, .35)";
        }
        return false;
      });
      editor.on("drop", (e) => {
        editor.contentAreaContainer.style.borderWidth = "";
        editor.contentAreaContainer.style.borderWidth = "";
      });
    }
  });
  return Promise.resolve();
}
export {
  TinymceController,
  addHook,
  clearHooks,
  create,
  destroy,
  get
};
//# sourceMappingURL=tinymce.js.map
