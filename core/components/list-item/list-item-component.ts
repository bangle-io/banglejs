import { chainCommands, Command } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { MoveDirection } from '../../types';
import {
  indentList,
  backspaceKeyCommand,
  enterKeyCommand,
  outdentList,
  moveEdgeListItem,
  updateNodeAttrs,
} from './commands';
import {
  cutEmptyCommand,
  copyEmptyCommand,
  parentHasDirectParentOfType,
  moveNode,
} from '../../core-commands';
import { filter, insertEmpty } from '../../utils/pm-utils';
import { domSerializationHelpers } from '../../utils/dom-serialization-helpers';
import browser from '../../utils/browser';
import { isNodeTodo, setTodoCheckedAttr } from './todo';
import { listItemNodeViewPlugin } from './list-item-node-view-plugin';
import { Node, Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { MarkdownSerializerState } from 'prosemirror-markdown';
import Token from 'markdown-it/lib/token';

const LOG = false;

let log = LOG ? console.log.bind(console, 'list-item') : () => {};

export const spec = specFactory;
export const plugins = pluginsFactory;
export const commands = {
  indentListItem,
  outdentListItem,
  moveListItemUp,
  moveListItemDown,
};
export const defaultKeys = {
  toggleDone: browser.mac ? 'Ctrl-Enter' : 'Ctrl-I',
  indent: 'Tab',
  outdent: 'Shift-Tab',
  moveDown: 'Alt-ArrowDown',
  moveUp: 'Alt-ArrowUp',
  emptyCopy: 'Mod-c',
  emptyCut: 'Mod-x',
  insertEmptyListAbove: 'Mod-Shift-Enter',
  insertEmptyListBelow: 'Mod-Enter',
};

const name = 'listItem';
const getTypeFromSchema = (schema: Schema) => schema.nodes[name];
const isValidList = (state: EditorState) => {
  const type = getTypeFromSchema(state.schema);
  return parentHasDirectParentOfType(type, [
    state.schema.nodes['bulletList'],
    state.schema.nodes['orderedList'],
  ]);
};

function specFactory() {
  const { toDOM, parseDOM } = domSerializationHelpers(name, {
    tag: 'li',
    // @ts-ignore DOMOutputSpec in @types is buggy
    content: 0,
  });

  return {
    type: 'node',
    name,
    schema: {
      content: '(paragraph) (paragraph | bulletList | orderedList)*',
      defining: true,
      draggable: true,
      attrs: {
        todoChecked: {
          default: null,
        },
      },
      toDOM,
      parseDOM,
    },
    markdown: {
      toMarkdown(state: MarkdownSerializerState, node: Node) {
        if (node.attrs.todoChecked != null) {
          state.write(node.attrs.todoChecked ? '[x] ' : '[ ] ');
        }
        state.renderContent(node);
      },
      parseMarkdown: {
        list_item: {
          block: name,
          getAttrs: (tok: Token) => {
            return {
              todoChecked: tok.attrGet('isDone'),
            };
          },
        },
      },
    },
  };
}

function pluginsFactory({ keybindings = defaultKeys, nodeView = true } = {}) {
  return ({ schema }: { schema: Schema }) => {
    const type = getTypeFromSchema(schema);

    return [
      keybindings &&
        keymap({
          [keybindings.toggleDone]: filter(
            isValidList,
            updateNodeAttrs(schema.nodes['listItem'], (attrs) => ({
              ...attrs,
              todoChecked:
                attrs.todoChecked == null ? false : !attrs.todoChecked,
            })),
          ),

          Backspace: backspaceKeyCommand(type),
          Enter: enterKeyCommand(type),
          [keybindings.indent]: indentListItem(),
          [keybindings.outdent]: outdentListItem(),
          [keybindings.moveUp]: moveListItemUp(),
          [keybindings.moveDown]: moveListItemDown(),
          [keybindings.emptyCut]: filter(isValidList, cutEmptyCommand(type)),
          [keybindings.emptyCopy]: filter(isValidList, copyEmptyCommand(type)),
          [keybindings.insertEmptyListAbove]: insertEmptySiblingListAbove(),
          [keybindings.insertEmptyListBelow]: insertEmptySiblingListBelow(),
        }),

      nodeView && listItemNodeViewPlugin(name),
    ];
  };
}

export function indentListItem(): Command {
  return (state, dispatch) => {
    const type = getTypeFromSchema(state.schema);
    return indentList(type)(state, dispatch);
  };
}

export function outdentListItem(): Command {
  return (state, dispatch, view) => {
    const type = getTypeFromSchema(state.schema);
    return outdentList(type)(state, dispatch, view);
  };
}

const isSelectionInsideTodo = (state: EditorState) => {
  return isNodeTodo(state.selection.$from.node(-1), state.schema);
};

function moveListItem(dir: MoveDirection): Command {
  return (state, dispatch, view) => {
    const { schema } = state;
    const type = getTypeFromSchema(schema);

    const isBulletList = parentHasDirectParentOfType(type, [
      schema.nodes['bulletList'],
      schema.nodes['orderedList'],
    ]);

    const move = (dir: MoveDirection) =>
      chainCommands(moveNode(type, dir), (state, dispatch, view) => {
        const node = state.selection.$from.node(-3);
        const isParentTodo = isNodeTodo(node, state.schema);
        const result = moveEdgeListItem(type, dir)(state, dispatch, view);

        if (!result) {
          return false;
        }

        // if parent was a todo convert the moved edge node
        // to todo bullet item
        if (isParentTodo && dispatch) {
          const state = view!.state;
          let { tr, schema } = state;
          tr = setTodoCheckedAttr(
            tr,
            schema,
            state.selection.$from.node(-1),
            state.selection.$from.before(-1),
          );
          dispatch(tr);
        }
        return true;
      });

    return filter(isBulletList, move(dir))(state, dispatch, view);
  };
}

export function moveListItemUp() {
  return moveListItem('UP');
}
export function moveListItemDown() {
  return moveListItem('DOWN');
}

export function insertEmptySiblingList(isAbove = true): Command {
  return (state, dispatch, view) => {
    const type = getTypeFromSchema(state.schema);
    return chainCommands(
      filter(
        isSelectionInsideTodo,
        insertEmpty(type, isAbove ? 'above' : 'below', true, {
          todoChecked: false,
        }),
      ),
      filter(isValidList, insertEmpty(type, isAbove ? 'above' : 'below', true)),
    )(state, dispatch, view);
  };
}

export function insertEmptySiblingListAbove() {
  return insertEmptySiblingList(true);
}

export function insertEmptySiblingListBelow() {
  return insertEmptySiblingList(false);
}
