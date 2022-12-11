import { FC, useState } from 'react';
import VectorType from '../../vector/vector-type';
import VectorList from '../VectorList/VectorList';
import VectorTypeChooser from '../VectorTypeChooser/VectorTypeChooser';
import styles from './VectorForm.module.css';

interface VectorFormProps {
  onCalculate?: (
    vectorType: VectorType,
    orthonormalize: boolean,
    vectors: string[]
  ) => void;
}

const VectorForm: FC<VectorFormProps> = ({ onCalculate }) => {
  const [vectorType, setVectorType] = useState<VectorType>(VectorType.REGULAR);
  const [orthonormalize, setOrthonormalize] = useState<boolean>(true);
  const [vectors, setVectors] = useState<string[]>([]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCalculate?.(vectorType, orthonormalize, vectors);
        }}
      >
        <div>
          <VectorTypeChooser onChange={setVectorType} />
          &nbsp;
          <label htmlFor="orthonormalize">Orthonormalize</label>
          <input
            id="orthonormalize"
            className={styles.checkbox}
            type="checkbox"
            defaultChecked
            onChange={(e) => setOrthonormalize(e.currentTarget.checked)}
          />
        </div>
        <div>
          <VectorList vectorType={vectorType} onChange={setVectors} />
        </div>
        <button type="submit">Calculate</button>
      </form>
    </>
  );
};

export default VectorForm;
