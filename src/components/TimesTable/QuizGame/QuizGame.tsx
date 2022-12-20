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

function generateNumber(min: number, max: number, learnBound: number) {
  return (
    Math.floor(Math.random() * (max - learnBound - min - learnBound + 1)) +
    min +
    learnBound
  );
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

    return [
      generateNumber(minNumber, maxNumber, learnBound),
      generateNumber(minNumber, maxNumber, learnBound),
    ];
  }, [learnBound, maxNumber, minNumber]);

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
