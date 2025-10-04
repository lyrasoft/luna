import { u as useVModel, d as defaultsDeep } from "./page-builder.js";
import { getCurrentInstance } from "vue";
function useAddonModel(defaultOptions) {
  const instance = getCurrentInstance();
  const value = useVModel(
    instance.props,
    "modelValue",
    instance.emit
  );
  value.value = defaultsDeep(value.value, defaultOptions);
  return value;
}
export {
  useAddonModel as u
};
//# sourceMappingURL=useAddonModel.js.map
