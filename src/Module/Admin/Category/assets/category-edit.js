/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

import u from '@main';

u.formValidation().then(() => {
  u.$ui.disableOnSubmit();
});
u.form('#admin-form').initComponent();

u.$ui.bootstrap.tooltip();
u.$ui.iframeModal();

u.$ui.bootstrap.keepTab('#admin-form .nav-tabs');

const { reactive, ref, toRefs, computed } = VueCompositionAPI;

const app = VueCompositionAPI.createApp({
  setup() {
    const state = reactive({
      items: handleItems(u.data('dividers')),
      isGlobal: u.data('is.global')
    });

    function addItem(i) {
      state.items.splice(i, 0, { uid: u.uid(), title: '', content: [getSubItem()] });
    }

    function addSubItem(content, k) {
      content.splice(k, 0, getSubItem());
    }

    function getSubItem() {
      return { uid: u.uid(), content: '' };
    }

    function deleteSubItem(list, i) {
      list.splice(i, 1);

      if (list.length === 0) {
        addSubItem(list, 0);
      }
    }

    const value = computed(() => {
      const v = {};

      state.items.forEach((item) => {
        item.uid = item.uid || u.uid();
        item = v[item.uid] = JSON.parse(JSON.stringify(item));

        const content = {};

        item.content.forEach((c) => {
          c.uid = c.uid || u.uid();
          content[c.uid] = c.content;
        });

        item.content = content;
      });

      return JSON.stringify(v);
    });

    return {
      ...toRefs(state),
      value,
      addItem,
      addSubItem,
      getSubItem,
      deleteSubItem
    };
  }
})
  .mount('#dividers-app');

function handleItems(items) {
  const data = [];

  Object.values(items).forEach((item, uid) => {
    data.push(item);

    const content = [];

    $.each(item.content, (uid, field) => {
      content.push({
        uid,
        content: field.title,
        origin: field.origin
      });
    });

    item.content = content;
  });

  return data;
}
