import { useState, useCallback, FormEvent, FC } from 'react';
import BoundChooser from '../BoundChooser/BoundChooser';

interface TimesTableFormProps {
  onGenerateTable?: (minNumber: number, maxNumber: number) => void;
}

const TimesTableForm: FC<TimesTableFormProps> = ({ onGenerateTable }) => {
  const [minNumber, setMinNumber] = useState<number>(1);
  const [maxNumber, setMaxNumber] = useState<number>(12);

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
      }
    },
    [onGenerateTable, minNumber, maxNumber]
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
      </form>
    </>
  );
};

export default TimesTableForm;
