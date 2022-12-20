import { useCallback, useId, useState } from 'react';
import BoundInput from '../BoundInput/BoundInput';

export interface BoundChooserProps {
  defaultMin: number;
  defaultMax: number;
  defaultLearnBound: number;
  onSetMinNumber?: (minNumber: number) => void;
  onSetMaxNumber?: (maxNumber: number) => void;
  onSetLearnBound?: (learnBound: number) => void;
}

const BoundChooser = ({
  defaultMin,
  defaultMax,
  defaultLearnBound,
  onSetMinNumber,
  onSetMaxNumber,
  onSetLearnBound,
}: BoundChooserProps) => {
  const [minNumber, setMinNumber] = useState(defaultMin);
  const [maxNumber, setMaxNumber] = useState(defaultMax);
  const minNumberId = useId();
  const maxNumberId = useId();
  const learnBoundId = useId();

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
        &nbsp;
        <BoundInput
          id={maxNumberId}
          min={minNumber}
          defaultBound={maxNumber}
          text="Max Number:"
          onBoundChange={onChangeMaxBound}
        />
      </div>
      <div>
        <BoundInput
          id={learnBoundId}
          min={1}
          defaultBound={defaultLearnBound}
          text="Maximum Number Skip:"
          onBoundChange={onSetLearnBound}
        />
      </div>
    </>
  );
};

export default BoundChooser;
