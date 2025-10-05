import { useHttpClient, addGlobalValidator, __, useMacro, useUnicorn } from "@windwalker-io/unicorn-next";
import "./chunks/usePageBuilderUtilities.js";
import { Dropdown } from "bootstrap";
async function useAccountCheck() {
  const { get } = await useHttpClient();
  await addGlobalValidator("account_check", async (account, input, options) => {
    const field = options.field || "username";
    const res = await get(
      "@account_check",
      { params: { field, value: account } }
    );
    if (res.data.data.exists) {
      return res.data.data.message || __("luna.message.user.account.exists");
    }
    return "";
  });
}
function useCaptcha() {
  return import("./chunks/captcha.js");
}
function useLangDropdown() {
  document.addEventListener("alpine:init", async () => {
    Alpine.data("LangDropdown", (options) => ({
      options,
      dropdown: null,
      items: [],
      loaded: false,
      init() {
        this.dropdown = Dropdown.getOrCreateInstance(
          // @ts-ignore
          this.$el,
          {
            autoClose: true
          }
        );
      },
      async buttonClicked(e) {
        if (this.loaded) {
          return;
        }
        const options2 = this.options;
        const { get } = await useHttpClient();
        let res = await get(
          options2.ajaxUrl,
          {
            params: {
              id: options2.id,
              type: options2.type,
              table: options2.table,
              idName: options2.idName,
              langField: options2.langField,
              routeName: options2.routeName
            }
          }
        );
        this.items = res.data.data;
        this.loaded = true;
      }
    }));
  });
}
function useLocaleSwitch() {
  return import("./chunks/locale-switch.js");
}
function useSrp() {
  return import("./chunks/srp.js");
}
async function usePageBuilder(rootContainer = "page-builder-app") {
  import("./chunks/page-builder.js").then((n) => n.p);
}
function createLuna() {
  return {
    install(app) {
      const $luna = {
        useAccountCheck,
        useCaptcha,
        useLangDropdown,
        useLocaleSwitch
      };
      useMacro("$luna", $luna);
    }
  };
}
function useLuna() {
  const u = useUnicorn();
  u.use(createLuna());
}
export {
  createLuna,
  useAccountCheck,
  useCaptcha,
  useLangDropdown,
  useLocaleSwitch,
  useLuna,
  usePageBuilder,
  useSrp
};
//# sourceMappingURL=luna.js.map
