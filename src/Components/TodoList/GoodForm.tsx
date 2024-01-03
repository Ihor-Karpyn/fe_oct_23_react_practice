import React, { FC, useState } from 'react';
import { inspect } from 'util';
import cn from 'classnames';
import { Color } from '../../types';

interface Props {
  colors: Color[];
  onSubmit: (goodName: string, colorId: number) => Promise<void>;
  submitButtonText?: string;
  initialGoodName?: string;
  initialColorId?: number;
}

export const GoodForm: FC<Props> = (props) => {
  const {
    colors,
    onSubmit,
    submitButtonText = 'Save',
    initialGoodName = '',
    initialColorId = 0,
  } = props;

  const [goodName, setGoodName] = useState(initialGoodName);
  const [selectColorId, setSelectedColorId] = useState(initialColorId);

  const [isNameError, setIsNameError] = useState(false);
  const [isColorError, setIsColorError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setGoodName('');
    setSelectedColorId(0);
  };

  const submitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsNameError(!goodName);
    setIsColorError(!selectColorId);

    if (!goodName || !selectColorId) {
      return;
    }

    setIsLoading(true);

    await onSubmit(goodName, selectColorId);

    clearForm();
    setIsLoading(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1 className="mb-16">Good Form</h1>

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
          disabled={isLoading}
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
          disabled={isLoading}
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

      <button
        type="submit"
        disabled={isLoading}
      >
        {`${submitButtonText} ${isLoading ? '...' : ''}`}
      </button>

      <hr />
    </form>
  );
};
