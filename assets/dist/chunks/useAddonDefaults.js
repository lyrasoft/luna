import { d as defaultsDeep } from "./SliderInput.js";
function useAddonDefaults(value, defaultOptions) {
  value.value = defaultsDeep(value.value, defaultOptions);
  return value;
}
export {
  useAddonDefaults as u
};
//# sourceMappingURL=useAddonDefaults.js.map
