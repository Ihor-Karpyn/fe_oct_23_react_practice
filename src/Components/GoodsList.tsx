import React, { FC } from 'react';
import { GoodWithColor } from '../types';

interface Props {
  goods: GoodWithColor[];
}

export const GoodsList: FC<Props> = (props) => {
  const { goods } = props;

  return (
    <div className="GoodList">
      {goods.map(good => (
        <article
          key={good.id}
          className="GoodCard"
        >
          <p
            className="GoodCard__title"
            style={{
              color: good.color?.name || 'black',
            }}
          >
            {good.name}
          </p>
        </article>
      ))}
    </div>
  );
};
