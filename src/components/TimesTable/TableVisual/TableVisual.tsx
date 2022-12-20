import { CSSProperties } from 'react';
import { Coordinate } from '../../../types/coordinate';
import styles from './TableVisual.module.css';

export interface TableVisualProps {
  minNumber: number;
  maxNumber: number;
  onExitTable?: () => void;
  getCellClassName?: (coordinate: Coordinate) => string | undefined;
  getCellStyle?: (coordinate: Coordinate) => CSSProperties | undefined;
  onMouseDown?: (coordinate: Coordinate) => void;
  onMouseOver?: (coordinate: Coordinate) => void;
}

const TableVisual = ({
  minNumber,
  maxNumber,
  onExitTable,
  getCellClassName,
  getCellStyle,
  onMouseDown,
  onMouseOver,
}: TableVisualProps) => {
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
              const coordinate: Coordinate = [indexA, indexB];

              return (
                <td
                  key={indexB}
                  className={getCellClassName?.(coordinate)}
                  style={getCellStyle?.(coordinate)}
                  onMouseDown={onMouseDown && (() => onMouseDown(coordinate))}
                  onMouseOver={onMouseOver && (() => onMouseOver(coordinate))}
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
