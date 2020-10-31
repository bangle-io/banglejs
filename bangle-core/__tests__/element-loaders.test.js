import { schemaLoader } from 'bangle-core/element-loaders';
import { MarkType, NodeType } from 'prosemirror-model';
import { hardBreak, doc, paragraph, text } from '../node-components/index';
import { bold } from '../mark-components/index';

test('Loads node and marks schema correctly', () => {
  const schema = schemaLoader([
    doc.spec(),
    text.spec(),
    hardBreak.spec(),
    paragraph.spec(),
    bold.spec(),
  ]);
  expect(schema.nodes).toMatchObject({
    doc: expect.any(NodeType),
    hard_break: expect.any(NodeType),
    paragraph: expect.any(NodeType),
    text: expect.any(NodeType),
  });

  expect(schema.topNodeType.name).toBe('doc');

  expect(schema.marks).toEqual({
    bold: expect.any(MarkType),
  });
});
