import React, { FC, useEffect, useState } from 'react';
import { Color } from '../types';
import { getColorById } from '../api/api';

interface Props {
  colorId: number;
  close: () => void;
}

export const ColorModal: FC<Props> = (props) => {
  const { close, colorId } = props;
  const [color, setColor] = useState<Color | null>(null);

  useEffect(() => {
    setColor(null);

    getColorById(colorId)
      .then(res => setColor(res))
      .catch(() => close());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorId]);

  return (
    <div style={{
      position: 'fixed',
      top: '25%',
      left: '25%',
      right: '25%',
      bottom: '25%',
      backgroundColor: 'silver',
    }}
    >
      <button type="button" onClick={close}>close</button>
      {`#${color?.id} Color name: ${color?.name}`}
    </div>
  );
};
