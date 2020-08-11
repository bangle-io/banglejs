import './style/tailwind.src.css';
import './style/style.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import React from 'react';
import { EditorContextProvider } from '../../src/utils/bangle-utils/helper-react/editor-context';
import browser from '../../src/utils/bangle-utils/utils/browser';

import { Editor } from './Editor';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { localManager } from './store/local';
import { defaultContent } from './components/constants';

const lastSavedContent = localManager.lastModifiedEntry();

export default class App extends React.PureComponent {
  state = {
    entry: undefined,
  };

  async componentDidMount() {
    let entry = await lastSavedContent;
    if (!entry) {
      console.log('no lastSavedContent');
      entry = await localManager.saveEntry({ content: defaultContent });
    }
    this.setState({ entry });
  }

  handleLoadEntry = (entry) => {
    this.setState({ entry });
  };

  handleNewEntry = async () => {
    const entry = await localManager.saveEntry({ content: defaultContent });
    this.setState({ entry });
  };

  handleRemoveEntry = async (entry) => {
    await localManager.removeEntry(entry);
    this.setState({ entry: await localManager.lastModifiedEntry() });
  };

  render() {
    const isMobile = browser.ios || browser.android;
    return (
      <EditorContextProvider>
        <div className="h-screen main-wrapper">
          {!isMobile && <Header entry={this.state.entry} />}
          <div className="editor-wrapper overflow-auto">
            {this.state.entry && <Editor entry={this.state.entry} />}
          </div>
          <Aside
            entry={this.state.entry}
            handleLoadEntry={this.handleLoadEntry}
            handleRemoveEntry={this.handleRemoveEntry}
            handleNewEntry={this.handleNewEntry}
            toggleSidebar={this.toggleSidebar}
          >
            {isMobile && <Header entry={this.state.entry} />}
          </Aside>
        </div>
      </EditorContextProvider>
    );
  }
}
