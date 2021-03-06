import { Fragment, NodeSelection } from '@bangle.dev/pm';

export * from './commands-helpers';
export * from './create-event';
export * from './dispatch-paste-event';
export * from './jest-helpers';
export * from './keyboard';
export * from './render-test-editor';
export * from './schema-builders';
export * from './selection-helpers';

export const selectNodeAt = (view, pos) => {
  const tr = view.state.tr;
  view.dispatch(tr.setSelection(NodeSelection.create(tr.doc, pos)));
};

/**
 *
 * @param {*} schema
 * @param {*} psxArray An array of psx nodes eg. [<para>hi</para>, <para>bye</para>]
 */
export const createPSXFragment = (schema, psxArray) => {
  return Fragment.fromArray(psxArray.map((r) => r(schema)));
};
