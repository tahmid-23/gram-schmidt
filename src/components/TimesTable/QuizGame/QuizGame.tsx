import { ChangeEvent, FormEvent, useCallback, useId, useState } from 'react';
import { useGenerator } from '../../../hooks/useGenerator';
import { Coordinate } from '../../../types/coordinate';
import styles from './QuizGame.module.css';

export interface QuizGameProps {
  minNumber: number;
  maxNumber: number;
  learnBound: number;
  onAnswer?: (coordinate: Coordinate, correct: boolean) => void;
}

function generateNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const QuizGame = ({
  minNumber,
  maxNumber,
  learnBound,
  onAnswer,
}: QuizGameProps) => {
  const generateQuestion = useCallback(() => {
    if (learnBound >= maxNumber) {
      return undefined;
    }

    const first = generateNumber(minNumber, maxNumber);
    const second = generateNumber(
      first <= learnBound ? learnBound + 1 : minNumber,
      maxNumber
    );
    return [first, second];
  }, [learnBound, maxNumber, minNumber]);

  const [prevMinNumber, setPrevMinNumber] = useState(minNumber);
  const [prevMaxNumber, setPrevMaxNumber] = useState(minNumber);
  const [question, refreshQuestion] = useGenerator(generateQuestion);
  const [answer, setAnswer] = useState<string>();
  const [correct, setCorrect] = useState<boolean>();
  const answerId = useId();

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!question || !answer) {
        return;
      }

      const correct = Number(answer) === question[0] * question[1];
      if (onAnswer) {
        onAnswer([question[0] - minNumber, question[1] - minNumber], correct);
      }
      setCorrect(correct);
      e.currentTarget.reset();
      refreshQuestion();
    },
    [answer, question, minNumber, onAnswer, refreshQuestion]
  );

  const onChangeAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  }, []);

  const changedMin = minNumber !== prevMinNumber;
  const changedMax = maxNumber !== prevMaxNumber;
  if (changedMin || changedMax) {
    refreshQuestion();
    if (changedMin) {
      setPrevMinNumber(minNumber);
    }
    if (changedMax) {
      setPrevMaxNumber(maxNumber);
    }
  }

  if (!question) {
    return <p>You've mastered everything!</p>;
  }

  return (
    <form onSubmit={onSubmitForm}>
      <p className={styles.question}>
        Question: {question[0]} * {question[1]}
      </p>
      <label htmlFor={answerId}>Answer: </label>
      <input
        id={answerId}
        type="number"
        min={0}
        onChange={onChangeAnswer}
        required
      />
      {correct !== undefined && (
        <>
          &nbsp;
          <span className={correct ? styles.correct : styles.wrong}>
            {correct ? 'Correct!' : 'Wrong!'}
          </span>
        </>
      )}
    </form>
  );
};

export default QuizGame;
