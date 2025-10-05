import { useHttpClient } from '@windwalker-io/unicorn-next';
import { Dropdown } from 'bootstrap';

export function useLangDropdown() {
  document.addEventListener('alpine:init', async () => {
    Alpine.data('LangDropdown', (options: any) => ({
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
        ) as any;
      },
      async buttonClicked(e: Event): Promise<any> {
        if (this.loaded) {
          return;
        }

        const options = this.options as any;

        const { get } = await useHttpClient();

        let res = await get(
          options.ajaxUrl,
          {
            params: {
              id: options.id,
              type: options.type,
              table: options.table,
              idName: options.idName,
              langField: options.langField,
              routeName: options.routeName,
            }
          }
        );

        this.items = res.data.data;

        this.loaded = true;
      }
    }))
  });
}

