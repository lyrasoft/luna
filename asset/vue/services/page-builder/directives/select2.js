/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

function updateFunction (el, binding) {
  // get options from binding value.
  // v-select="THIS-IS-THE-BINDING-VALUE"
  let options = binding.value || {};

  // set up select2
  $(el).select2(options).on("select2:select", (e) => {
    // v-model looks for
    //  - an event named "change"
    //  - a value with property path "$event.target.value"
    el.dispatchEvent(new Event('change', { target: e.target }));
  });
}

Vue.directive('select2', {
  inserted: updateFunction,
  componentUpdated: updateFunction
});
