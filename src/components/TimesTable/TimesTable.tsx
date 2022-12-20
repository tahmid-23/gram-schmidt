import { ReactNode, useCallback, useState } from 'react';
import { useTitle } from '../../hooks/useTitle';
import Header from '../Header/Header';
import QuickNavigation from '../QuickNavigation/QuickNavigation';
import QuizDisplay from './QuizDisplay/QuizDisplay';
import StudyTableVisual from './StudyTableVisual/StudyTableVisual';
import TimesTableForm from './TimesTableForm/TimesTableForm';

enum Mode {
  TABLE,
  GAME,
}

const TimesTable = () => {
  const [bounds, setBounds] = useState<[number, number, number]>();
  const [mode, setMode] = useState<Mode>();

  const onGenerateTable = useCallback(
    (minNumber: number, maxNumber: number, learnBound: number) => {
      setBounds([minNumber, maxNumber, learnBound]);
      setMode(Mode.TABLE);
    },
    []
  );

  const onPlayGame = useCallback(
    (minNumber: number, maxNumber: number, learnBound: number) => {
      setBounds([minNumber, maxNumber, learnBound]);
      setMode(Mode.GAME);
    },
    []
  );

  const getExtraContent = useCallback(() => {
    if (!bounds) {
      return;
    }

    let content: ReactNode;
    switch (mode) {
      case Mode.TABLE: {
        content = (
          <StudyTableVisual minNumber={bounds[0]} maxNumber={bounds[1]} />
        );
        break;
      }
      case Mode.GAME: {
        content = (
          <QuizDisplay
            minNumber={bounds[0]}
            maxNumber={bounds[1]}
            learnBound={bounds[2]}
          />
        );
        break;
      }
    }

    if (content) {
      return (
        <>
          &nbsp;
          <div>{content}</div>
        </>
      );
    }

    return undefined;
  }, [bounds, mode]);

  useTitle('Times Table');

  return (
    <>
      <Header title={'Times Table'} />
      <TimesTableForm
        onGenerateTable={onGenerateTable}
        onPlayGame={onPlayGame}
      />
      {getExtraContent()}
      <QuickNavigation />
    </>
  );
};

export default TimesTable;
