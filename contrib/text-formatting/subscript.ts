import type { Command, Schema } from '@bangle.dev/pm';
import { keymap, toggleMark } from '@bangle.dev/pm';
import { isMarkActiveInSelection } from '@bangle.dev/utils';

export const spec = specFactory;
export const plugins = pluginsFactory;
export const commands = {
  toggleSubscript,
  queryIsSubscriptActive,
};
export const defaultKeys = {
  toggleSubscript: '',
};

const name = 'subscript';

function specFactory(opts = {}) {
  return {
    type: 'mark',
    name,
    schema: {
      excludes: 'superscript',
      parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
      toDOM: () => ['sub', 0],
    },
  };
}

function pluginsFactory({ keybindings = defaultKeys } = {}) {
  return ({ schema }: { schema: Schema }) => {
    return [
      keybindings &&
        keymap({
          [keybindings.toggleSubscript]: toggleSubscript(),
        }),
    ];
  };
}

export function toggleSubscript(): Command {
  return (state, dispatch, view) => {
    return toggleMark(state.schema.marks[name])(state, dispatch);
  };
}

export function queryIsSubscriptActive(): Command {
  return (state) => isMarkActiveInSelection(state.schema.marks[name])(state);
}
