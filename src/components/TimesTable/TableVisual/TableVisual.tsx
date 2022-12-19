import { FC, useCallback, useState } from 'react';
import styles from './TableVisual.module.css';

interface TableVisualProps {
  minNumber: number;
  maxNumber: number;
}

type Coordinate = [number, number];

const TableVisual: FC<TableVisualProps> = ({ minNumber, maxNumber }) => {
  const [highlightCoordinate, setHighlightCoordinate] = useState<Coordinate>();
  const [isFrozen, setIsFrozen] = useState<boolean>(false);

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

  const range = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_v, k) => k + minNumber
  );

  return (
    <table className={styles.timesTable} onMouseLeave={onExitTable}>
      <tbody>
        <tr>
          <td />
          {range.map((value, index) => (
            <th key={index}>{value}</th>
          ))}
        </tr>
        {range.map((valueA, indexA) => (
          <tr key={indexA}>
            <th>{valueA}</th>
            {range.map((valueB, indexB) => {
              const cellCoordinate: Coordinate = [indexA, indexB];

              return (
                <td
                  key={indexB}
                  className={getCellClassName(cellCoordinate)}
                  onMouseOver={() => {
                    if (!isFrozen) {
                      setHighlightCoordinate(cellCoordinate);
                    }
                  }}
                  onMouseDown={() => {
                    if (!highlightCoordinate) {
                      return;
                    }

                    const isHighlightCoordinate =
                      cellCoordinate[0] === highlightCoordinate[0] &&
                      cellCoordinate[1] === highlightCoordinate[1];
                    if (isHighlightCoordinate) {
                      setIsFrozen(!isFrozen);
                    } else {
                      setIsFrozen(false);
                      setHighlightCoordinate(cellCoordinate);
                    }
                  }}
                >
                  {valueA * valueB}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableVisual;
