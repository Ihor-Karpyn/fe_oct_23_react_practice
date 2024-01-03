import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { Colors } from './Components/Colors/Colors';
import { NotFound } from './Components/NotFound/NotFound';
import { Todo } from './Components/Todo/Todo';
import { Home } from './Components/Home/Home';
import { TodosList } from './Components/TodoList/TodosList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <TodosList />,
      },
      {
        path: '/colors',
        element: <Colors />,
      },
      {
        path: 'todos/:id',
        element: <Todo />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root'),
);
