import { ChangeEvent, useCallback } from 'react';

export interface BoundInputProps {
  id: string;
  min?: number;
  max?: number;
  defaultBound: number;
  text: string;
  onBoundChange: (newBound: number) => void;
}

const BoundInput = ({
  id,
  min,
  max,
  defaultBound,
  text,
  onBoundChange,
}: BoundInputProps) => {
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
