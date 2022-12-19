import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useId,
  useState,
} from 'react';
import { useGenerator } from '../../../hooks/useGenerator';
import styles from './QuizGame.module.css';

interface QuizGameProps {
  minNumber: number;
  maxNumber: number;
}

function generateNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const QuizGame: FC<QuizGameProps> = ({ minNumber, maxNumber }) => {
  const generateQuestion = useCallback(
    () => [
      generateNumber(minNumber, maxNumber),
      generateNumber(minNumber, maxNumber),
    ],
    [maxNumber, minNumber]
  );

  const [question, refreshQuestion] = useGenerator(generateQuestion);
  const [answer, setAnswer] = useState<string>();
  const [correct, setCorrect] = useState<boolean>();
  const answerId = useId();

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!answer) {
        return;
      }

      setCorrect(Number(answer) === question[0] * question[1]);
      refreshQuestion();
    },
    [answer, question, refreshQuestion]
  );

  const onChangeAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  }, []);

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
