import { useCallback, useState } from 'react';
import { Coordinate } from '../../../types/coordinate';
import QuizGame from '../QuizGame/QuizGame';
import QuizResultTableVisual from '../QuizResultTableVisual/QuizResultTableVisual';

export interface QuizDisplayProps {
  minNumber: number;
  maxNumber: number;
}

const QuizDisplay = ({ minNumber, maxNumber }: QuizDisplayProps) => {
  const createEmptyAnswers = useCallback(() => {
    return Array(maxNumber - minNumber + 1).fill(
      Array(maxNumber - minNumber + 1).fill(0)
    );
  }, [minNumber, maxNumber]);

  const [showGame, setShowGame] = useState(true);
  const [answers, setAnswers] = useState<number[][]>(createEmptyAnswers());

  const goToResults = () => {
    setShowGame(false);
  };
  const goToGame = () => {
    setAnswers(createEmptyAnswers());
    setShowGame(true);
  };

  const onAnswer = useCallback(
    (coordinate: Coordinate, correct: boolean) => {
      const answersCopy = answers.map((answerRow) => [...answerRow]);
      if (correct) {
        ++answersCopy[coordinate[0]][coordinate[1]];
      } else {
        --answersCopy[coordinate[0]][coordinate[1]];
      }

      setAnswers(answersCopy);
    },
    [answers]
  );

  if (showGame) {
    return (
      <>
        <QuizGame
          minNumber={minNumber}
          maxNumber={maxNumber}
          onAnswer={onAnswer}
        />
        <button type="button" onClick={goToResults}>
          Show Results
        </button>
      </>
    );
  }

  return (
    <>
      <QuizResultTableVisual
        minNumber={minNumber}
        maxNumber={maxNumber}
        results={answers}
      />
      <button type="button" onClick={goToGame}>
        Restart Game
      </button>
    </>
  );
};

export default QuizDisplay;
