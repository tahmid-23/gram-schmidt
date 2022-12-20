import { useState, useCallback, FormEvent } from 'react';
import BoundChooser from '../BoundChooser/BoundChooser';

export interface TimesTableFormProps {
  onGenerateTable?: (
    minNumber: number,
    maxNumber: number,
    learnBound: number
  ) => void;
  onPlayGame?: (
    minNumber: number,
    maxNumber: number,
    learnBound: number
  ) => void;
}

const TimesTableForm = ({
  onGenerateTable,
  onPlayGame,
}: TimesTableFormProps) => {
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(12);
  const [learnBound, setLearnBound] = useState(1);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const submitterElement = (e.nativeEvent as SubmitEvent).submitter;
      if (
        !submitterElement ||
        !(submitterElement instanceof HTMLButtonElement)
      ) {
        return;
      }

      switch (submitterElement.name) {
        case 'generate-table': {
          onGenerateTable?.(minNumber, maxNumber, learnBound);
          break;
        }
        case 'play-game': {
          onPlayGame?.(minNumber, maxNumber, learnBound);
          break;
        }
      }
    },
    [onGenerateTable, onPlayGame, minNumber, maxNumber, learnBound]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <BoundChooser
          defaultMin={1}
          defaultMax={12}
          defaultLearnBound={1}
          onSetMinNumber={setMinNumber}
          onSetMaxNumber={setMaxNumber}
          onSetLearnBound={setLearnBound}
        />
        <button type="submit" name="generate-table">
          Generate Table
        </button>
        &nbsp;
        <button type="submit" name="play-game">
          Play Game
        </button>
      </form>
    </>
  );
};

export default TimesTableForm;
