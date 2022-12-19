import { ChangeEvent, FC, useCallback } from 'react';

interface BoundInputProps {
  id: string;
  min?: number;
  max?: number;
  defaultBound: number;
  text: string;
  onBoundChange: (newBound: number) => void;
}

const BoundInput: FC<BoundInputProps> = ({
  id,
  min,
  max,
  defaultBound,
  text,
  onBoundChange,
}) => {
  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onBoundChange(Number(e.currentTarget.value));
    },
    [onBoundChange]
  );

  return (
    <>
      <label htmlFor={id}>{text}</label>
      &nbsp;
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        defaultValue={String(defaultBound)}
        onChange={onInputChange}
        required
      />
    </>
  );
};

export default BoundInput;
