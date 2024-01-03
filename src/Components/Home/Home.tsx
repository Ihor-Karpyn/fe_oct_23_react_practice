import React, { FC } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { AppNavLink } from '../ui/AppNavLink/AppNavLink';

export const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Todo App</h1>

      <div style={{ margin: '24px' }}>
        <hr />
        <button
          style={{ marginRight: '8px' }}
          onClick={() => navigate(-1)}
        >
          {`< Go back`}
        </button>
        <AppNavLink to="/">
          Home
        </AppNavLink>
        <AppNavLink to="/colors">
          Colors
        </AppNavLink>
        <hr />
      </div>

      <Outlet />

      <footer>
        <hr />
        <h2>Todo list footer</h2>
        <hr />
      </footer>
    </>
  );
};
