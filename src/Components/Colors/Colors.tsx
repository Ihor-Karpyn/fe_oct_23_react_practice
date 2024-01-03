import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Color } from '../../types';
import { getColors } from '../../api/api';

export const Colors: FC = (props) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(
    () => {
      getColors().then(setColors);
    },
    [],
  );

  return (
    <>
      <h1>Colors</h1>

      <ul>
        {colors.map(color => (
          <li
            key={color.id}
            style={{
              color: color.name,
            }}
          >
            {color.name}
          </li>
        ))}
      </ul>
    </>
  );
};
