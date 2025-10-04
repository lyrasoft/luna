import { defineModel } from "vue";
import { d as defaultsDeep } from "./page-builder.js";
function useAddonModel(defaultOptions) {
  const value = defineModel({
    required: true
  });
  value.value = defaultsDeep(value.value, defaultOptions);
  return value;
}
export {
  useAddonModel as u
};
//# sourceMappingURL=useAddonModel.js.map
