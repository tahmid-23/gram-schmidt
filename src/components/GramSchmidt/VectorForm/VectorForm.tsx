import { FC, FormEvent, useCallback, useState } from 'react';
import InnerProduct from '../../../vector/inner-product';
import VectorType from '../../../vector/vector-type';
import InnerProductChooser, {
  InnerProductEntry,
} from '../InnerProductChooser/InnerProductChooser';
import VectorList from '../VectorList/VectorList';
import VectorTypeChooser from '../VectorTypeChooser/VectorTypeChooser';
import styles from './VectorForm.module.css';

interface VectorFormProps {
  onCalculate?: (
    vectorType: VectorType,
    orthonormalize: boolean,
    innerProduct: InnerProduct<unknown>,
    vectors: string[]
  ) => void;
}

const weightedDotProduct = (factor: number, a: number[], b: number[]) => {
  return a.reduce((accumulator, component, index) => {
    return accumulator + factor * component * b[index];
  }, 0);
};

const dotProduct = (a: number[], b: number[]) => weightedDotProduct(1, a, b);

const VectorForm: FC<VectorFormProps> = ({ onCalculate }) => {
  const [vectorType, setVectorType] = useState<VectorType>(VectorType.REGULAR);
  const [orthonormalize, setOrthonormalize] = useState<boolean>(true);
  const [innerProduct, setInnerProduct] = useState<InnerProduct<unknown>>(
    () => dotProduct as InnerProduct<unknown>
  );
  const [vectors, setVectors] = useState<string[]>([]);

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onCalculate?.(vectorType, orthonormalize, innerProduct, vectors);
    },
    [innerProduct, onCalculate, orthonormalize, vectorType, vectors]
  );

  let nameIPRecord: Record<string, InnerProductEntry>;
  switch (vectorType) {
    case VectorType.REGULAR: {
      nameIPRecord = {
        dot: {
          name: 'Dot Product',
          display: null,
          onSelect: () =>
            setInnerProduct(() => dotProduct as InnerProduct<unknown>),
        },
      };
      break;
    }
    case VectorType.POLYNOMIAL: {
      nameIPRecord = {};
    }
  }

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div>
          <VectorTypeChooser onChange={setVectorType} />
          <InnerProductChooser nameIPRecord={nameIPRecord} />
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
