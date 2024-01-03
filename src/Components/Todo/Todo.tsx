import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Good } from '../../types';
import { getGoodById, getGoods } from '../../api/api';

export const Todo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useNavigate();

  const [todo, setTodo] = useState<Good | null>(null);

  useEffect(
    () => {
      const goodId = Number(id);

      const isValid = !Number.isNaN(goodId);

      if (!isValid) {
        router('/404');

        return;
      }

      getGoodById(Number(id))
        .then(setTodo)
        .catch(() => router('/404'));
    },
    [id, router],
  );

  return (
    <>
      <h1>Todo page</h1>

      {!todo && <p>...Loading</p>}

      {todo && (
        <>
          <h2>{todo.id}</h2>
          <p>{todo.name}</p>
          <p>{todo.colorId}</p>
        </>
      )}
    </>
  );
};
