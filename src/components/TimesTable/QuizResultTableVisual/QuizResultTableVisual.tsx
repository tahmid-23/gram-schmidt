import { CSSProperties, FC, useCallback, useEffect, useState } from 'react';
import { Coordinate } from '../../../types/Coordinate';
import TableVisual from '../TableVisual/TableVisual';

interface QuizResultTableVisualProps {
  minNumber: number;
  maxNumber: number;
  results: number[][];
}

const QuizResultTableVisual: FC<QuizResultTableVisualProps> = ({
  minNumber,
  maxNumber,
  results,
}) => {
  const [accuracyBounds, setAccuracyBounds] = useState<[number, number]>();

  useEffect(() => {
    const minAccuracy = Math.min(...results.map((row) => Math.min(...row)));
    const maxAccuracy = Math.max(...results.map((row) => Math.max(...row)));
    setAccuracyBounds([minAccuracy, maxAccuracy]);
  }, [results]);

  const getCellStyle = useCallback(
    (coordinate: Coordinate): CSSProperties | undefined => {
      if (!accuracyBounds || accuracyBounds[0] === accuracyBounds[1]) {
        return undefined;
      }

      const accuracy = results[coordinate[0]][coordinate[1]];
      if (!accuracy) {
        return undefined;
      }

      let lerp: number;
      if (accuracy > 0) {
        lerp = 0.5 + accuracy / (2 * accuracyBounds[1]);
      } else {
        lerp = 0.5 - accuracy / (2 * accuracyBounds[0]);
      }

      return {
        backgroundColor: `hsl(calc(${lerp} * 120), 100%, 50%)`,
      };
    },
    [results, accuracyBounds]
  );

  return (
    <TableVisual
      minNumber={minNumber}
      maxNumber={maxNumber}
      getCellStyle={getCellStyle}
    />
  );
};

export default QuizResultTableVisual;
