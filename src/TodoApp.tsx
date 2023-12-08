import React from 'react';
import './App.scss';
import { Todo, User } from './types';
import { todosFromServer, usersFromServer } from './api/data';
import { getNewId, getTodosWithUser } from './helpers';
import { App } from './App';

interface State {
  users: User[];
  todos: Todo[];
  newTodoTitle: string;
}

export class TodoApp extends React.Component<{}, State> {
  state: State = {
    users: [],
    todos: [],
    newTodoTitle: '',
  }

  componentDidMount() {
    console.log(`componentDidMount`);

    setTimeout(
      () => this.setState({
        todos: todosFromServer,
        users: usersFromServer,
      }),
      1000,
    );

    document.addEventListener('contextmenu', this.contextMenuHandler);
  }

  componentDidUpdate(prevProps: any, prevState: State) {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');

    document.removeEventListener('contextmenu', this.contextMenuHandler);
  }

  contextMenuHandler(event) {
    event.preventDefault();

    console.log('---###--------------------###---');
    console.log('click');
    console.log('---###--------------------###---');
  }

  addNewTodo() {
    this.setState((currentState) => {
      const {
        todos,
        users,
        newTodoTitle,
      } = currentState;

      const user = users[0];

      const newTodo: Todo = {
        id: getNewId(todos),
        title: newTodoTitle,
        userId: user.id,
      };

      return { todos: [newTodo, ...todos] };
    });
  }

  render() {
    const { users, todos, newTodoTitle } = this.state;

    console.log('render');

    const todosWithUser = getTodosWithUser(todos, users);

    return (
      <div>
        <h1>Todo list</h1>

        <input
          type="text"
          value={newTodoTitle}
          onChange={event => this.setState({
            newTodoTitle: event.target.value,
          })}
        />

        <button
          type="button"
          onClick={() => this.addNewTodo()}
        >
          Add
        </button>

        {!todosWithUser.length && (
          <h3>Loading...</h3>
        )}

        <ul>
          {todosWithUser.map(todo => (
            <li key={todo.id}>
              <p>{`#${todo.id} ${todo.title} - ${todo.user?.userName}`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
