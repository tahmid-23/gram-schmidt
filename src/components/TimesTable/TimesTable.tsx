import { ReactNode, useCallback, useState } from 'react';
import { useTitle } from '../../hooks/useTitle';
import Header from '../Header/Header';
import QuickNavigation from '../QuickNavigation/QuickNavigation';
import TableVisual from './TableVisual/TableVisual';
import TimesTableForm from './TimesTableForm/TimesTableForm';

enum Mode {
  TABLE,
  GAME,
}

const TimesTable = () => {
  const [bounds, setBounds] = useState<[number, number]>();
  const [mode, setMode] = useState<Mode>();

  const onGenerateTable = useCallback(
    (minNumber: number, maxNumber: number) => {
      setBounds([minNumber, maxNumber]);
      setMode(Mode.TABLE);
    },
    []
  );

  const onPlayGame = useCallback((minNumber: number, maxNumber: number) => {
    setBounds([minNumber, maxNumber]);
    setMode(Mode.GAME);
  }, []);

  const getExtraContent = useCallback(() => {
    if (!bounds) {
      return;
    }

    let content: ReactNode;
    switch (mode) {
      case Mode.TABLE: {
        content = <TableVisual minNumber={bounds[0]} maxNumber={bounds[1]} />;
        break;
      }
      case Mode.GAME: {
        content = null;
        break;
      }
    }

    if (content) {
      return (
        <>
          &nbsp;
          {content}
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
