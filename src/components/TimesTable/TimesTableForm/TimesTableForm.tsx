import { useState, useCallback, FormEvent } from 'react';
import BoundChooser from '../BoundChooser/BoundChooser';

export interface TimesTableFormProps {
  onGenerateTable?: (minNumber: number, maxNumber: number) => void;
  onPlayGame?: (minNumber: number, maxNumber: number) => void;
}

const TimesTableForm = ({
  onGenerateTable,
  onPlayGame,
}: TimesTableFormProps) => {
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(12);

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
          onGenerateTable?.(minNumber, maxNumber);
          break;
        }
        case 'play-game': {
          onPlayGame?.(minNumber, maxNumber);
          break;
        }
      }
    },
    [onGenerateTable, onPlayGame, minNumber, maxNumber]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <BoundChooser
          defaultMin={1}
          defaultMax={12}
          onSetMinNumber={setMinNumber}
          onSetMaxNumber={setMaxNumber}
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
