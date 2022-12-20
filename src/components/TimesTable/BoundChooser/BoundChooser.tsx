import { useCallback, useId, useState } from 'react';
import BoundInput from '../BoundInput/BoundInput';

export interface BoundChooserProps {
  defaultMin: number;
  defaultMax: number;
  onSetMinNumber?: (minNumber: number) => void;
  onSetMaxNumber?: (maxNumber: number) => void;
}

const BoundChooser = ({
  defaultMin,
  defaultMax,
  onSetMinNumber,
  onSetMaxNumber,
}: BoundChooserProps) => {
  const [minNumber, setMinNumber] = useState(defaultMin);
  const [maxNumber, setMaxNumber] = useState(defaultMax);
  const minNumberId = useId(),
    maxNumberId = useId();

  const onChangeMinBound = useCallback(
    (newMinNumber: number) => {
      setMinNumber(newMinNumber);
      onSetMinNumber?.(newMinNumber);
    },
    [onSetMinNumber]
  );

  const onChangeMaxBound = useCallback(
    (newMaxNumber: number) => {
      setMaxNumber(newMaxNumber);
      onSetMaxNumber?.(newMaxNumber);
    },
    [onSetMaxNumber]
  );

  return (
    <>
      <div>
        <BoundInput
          id={minNumberId}
          min={1}
          max={maxNumber}
          defaultBound={minNumber}
          text="Min Number:"
          onBoundChange={onChangeMinBound}
        />
      </div>
      <div>
        <BoundInput
          id={maxNumberId}
          min={minNumber}
          defaultBound={maxNumber}
          text="Max Number:"
          onBoundChange={onChangeMaxBound}
        />
      </div>
    </>
  );
};

export default BoundChooser;
