import React from 'react';
import reactDOM from 'react-dom';
import { ReactEditor } from 'bangle-react/index';
import { SpecRegistry } from 'bangle-core/spec-registry';
import {
  defaultPlugins,
  defaultSpecs,
} from 'bangle-core/test-helpers/default-components';

export function setupReactEditor({
  specRegistry,
  plugins = defaultPlugins,
  renderNodeViews,
  id = 'pm-root',
} = {}) {
  const element = document.createElement('div');
  window.document.body.appendChild(element);
  element.setAttribute('id', 'root');
  if (!(specRegistry instanceof SpecRegistry)) {
    specRegistry = new SpecRegistry(defaultSpecs(specRegistry));
  }
  reactDOM.render(
    <App opts={{ specRegistry, plugins, renderNodeViews, id }} />,
    element,
  );
}

function App({ opts: { specRegistry, plugins, renderNodeViews, id } }) {
  const onEditorReady = (_editor) => {
    window.editor = _editor;
  };

  window.dispatcher = (command) => {
    return command(
      window.editor.view.state,
      window.editor.view.dispatch,
      window.editor.view,
    );
  };

  return (
    <ReactEditor
      options={{ id, specRegistry, plugins }}
      onReady={onEditorReady}
      renderNodeViews={renderNodeViews}
    />
  );
}
