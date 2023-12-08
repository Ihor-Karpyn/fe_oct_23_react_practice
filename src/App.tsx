import React from 'react';
import './App.scss';
import { TodoApp } from './TodoApp';

interface State {
  isTodoListVisible: boolean;
}

export class App extends React.Component<{}, State> {
  state: State = {
    isTodoListVisible: false,
  }

  render() {
    return (
      <>
        <button
          type="button"
          onClick={() => this.setState(prev => ({
            isTodoListVisible: !prev.isTodoListVisible,
          }))}
        >
          Toggle visible
        </button>

        {this.state.isTodoListVisible && (
          <TodoApp />
        )}
      </>
    );
  }
}
