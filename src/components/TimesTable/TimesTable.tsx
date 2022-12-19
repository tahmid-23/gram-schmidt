import { FormEvent, useCallback, useState } from 'react';
import { useTitle } from '../../hooks/useTitle';
import Header from '../Header/Header';
import TableVisual from './TableVisual/TableVisual';
import TimesTableForm from './TimesTableForm/TimesTableForm';

const TimesTable = () => {
  const [tableBounds, setTableBounds] = useState<[number, number]>();

  const onGenerateTable = useCallback(
    (minNumber: number, maxNumber: number) => {
      setTableBounds([minNumber, maxNumber]);
    },
    []
  );

  useTitle('Times Table');

  return (
    <>
      <Header title={'Times Table'} />
      <TimesTableForm onGenerateTable={onGenerateTable} />
      {tableBounds && (
        <>
          &nbsp;
          <TableVisual minNumber={tableBounds[0]} maxNumber={tableBounds[1]} />
        </>
      )}
    </>
  );
};

export default TimesTable;
