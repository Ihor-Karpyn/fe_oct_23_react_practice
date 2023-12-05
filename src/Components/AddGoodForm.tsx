import React, { FC, useState } from 'react';
import { inspect } from 'util';
import cn from 'classnames';
import { Color } from '../types';

interface Props {
  colors: Color[];
  addGood: (goodName: string, colorId: number) => void;
}

export const AddGoodForm: FC<Props> = (props) => {
  const { colors, addGood } = props;

  const [goodName, setGoodName] = useState('');
  const [selectColorId, setSelectedColorId] = useState(0);

  const [isNameError, setIsNameError] = useState(false);
  const [isColorError, setIsColorError] = useState(false);

  const clearForm = () => {
    setGoodName('');
    setSelectedColorId(0);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsNameError(!goodName);
    setIsColorError(!selectColorId);

    if (!goodName || !selectColorId) {
      return;
    }

    addGood(goodName, selectColorId);
    addGood(goodName, selectColorId);
    addGood(goodName, selectColorId);
    clearForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="mb-16">AddGoodForm</h1>

      <div className="mb-16">
        <input
          type="text"
          placeholder="Good name"
          className={cn('mb-8', {
            inputError: isNameError,
          })}
          value={goodName}
          onChange={(event) => {
            setGoodName(event.target.value);
            setIsNameError(false);
          }}
        />

        <select
          value={selectColorId}
          className={cn({
            inputError: isColorError,
          })}
          onChange={(event) => {
            setSelectedColorId(+event.target.value);
            setIsColorError(false);
          }}
        >
          <option value={0} disabled>Select color</option>

          {colors.map(color => (
            <option
              key={color.id}
              value={color.id}
            >
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add good</button>

      <hr />
    </form>
  );
};
