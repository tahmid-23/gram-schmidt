import { FC, useCallback, useState } from 'react';
import { Coordinate } from '../../../types/Coordinate';
import TableVisual from '../TableVisual/TableVisual';
import styles from './StudyTableVisual.module.css';

interface StudyTableVisualProps {
  minNumber: number;
  maxNumber: number;
}

const StudyTableVisual: FC<StudyTableVisualProps> = ({
  minNumber,
  maxNumber,
}) => {
  const [highlightCoordinate, setHighlightCoordinate] = useState<Coordinate>();
  const [isFrozen, setIsFrozen] = useState(false);

  const onExitTable = useCallback(() => {
    if (!isFrozen) {
      setHighlightCoordinate(undefined);
    }
  }, [isFrozen]);

  const getCellClassName = useCallback(
    (cellCoordinate: Coordinate) => {
      if (!highlightCoordinate) {
        return undefined;
      }

      const firstEquals = cellCoordinate[0] === highlightCoordinate[0],
        secondEquals = cellCoordinate[1] === highlightCoordinate[1];
      if (firstEquals && secondEquals) {
        return styles.highlightDark;
      }
      if (firstEquals || secondEquals) {
        return styles.highlightLight;
      }

      return undefined;
    },
    [highlightCoordinate]
  );

  const onMouseDown = useCallback(
    (coordinate: Coordinate) => {
      if (!highlightCoordinate) {
        return;
      }

      const isHighlightCoordinate =
        coordinate[0] === highlightCoordinate[0] &&
        coordinate[1] === highlightCoordinate[1];
      if (isHighlightCoordinate) {
        setIsFrozen(!isFrozen);
      } else {
        setIsFrozen(false);
        setHighlightCoordinate(coordinate);
      }
    },
    [highlightCoordinate, isFrozen]
  );

  const onMouseOver = useCallback(
    (coordinate: Coordinate) => {
      if (!isFrozen) {
        setHighlightCoordinate(coordinate);
      }
    },
    [isFrozen]
  );

  return (
    <TableVisual
      minNumber={minNumber}
      maxNumber={maxNumber}
      onExitTable={onExitTable}
      getCellClassName={getCellClassName}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    />
  );
};

export default StudyTableVisual;
