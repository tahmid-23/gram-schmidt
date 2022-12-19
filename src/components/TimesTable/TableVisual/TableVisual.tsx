import { FC } from 'react';
import styles from './TableVisual.module.css';

interface TableVisualProps {
  minNumber: number;
  maxNumber: number;
}

const TableVisual: FC<TableVisualProps> = ({ minNumber, maxNumber }) => {
  const range = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_v, k) => k + minNumber
  );

  return (
    <table className={styles.timesTable}>
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
            {range.map((valueB, indexB) => (
              <td key={indexB}>{valueA * valueB}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableVisual;
