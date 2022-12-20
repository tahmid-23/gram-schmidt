import { FormEvent, useCallback, useEffect, useId, useState } from 'react';
import InnerProduct from '../../../vector/inner-product';
import VectorType from '../../../vector/vector-type';
import InnerProductChooser, {
  InnerProductEntry,
} from '../InnerProductChooser/InnerProductChooser';
import VectorList from '../VectorList/VectorList';
import VectorTypeChooser from '../VectorTypeChooser/VectorTypeChooser';
import styles from './VectorForm.module.css';

export interface VectorFormProps {
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

const VectorForm = ({ onCalculate }: VectorFormProps) => {
  const [vectorType, setVectorType] = useState(VectorType.REGULAR);
  const [orthonormalize, setOrthonormalize] = useState(true);
  const [innerProduct, setInnerProduct] = useState(
    () => dotProduct as InnerProduct<unknown>
  );
  const [nameIPRecord, setNameIPRecord] = useState<
    Record<string, InnerProductEntry>
  >({});
  const [vectors, setVectors] = useState<string[]>([]);
  const orthonormalizeId = useId();

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onCalculate?.(vectorType, orthonormalize, innerProduct, vectors);
    },
    [innerProduct, onCalculate, orthonormalize, vectorType, vectors]
  );

  useEffect(() => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        setNameIPRecord({
          dot: {
            name: 'Dot Product',
            display: null,
            onSelect: () =>
              setInnerProduct(() => dotProduct as InnerProduct<unknown>),
          },
        });
        break;
      }
      case VectorType.POLYNOMIAL: {
        setNameIPRecord({});
      }
    }
  }, [vectorType]);

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div>
          <VectorTypeChooser onChange={setVectorType} />
          &nbsp;
          <InnerProductChooser nameIPRecord={nameIPRecord} />
          &nbsp;
          <label htmlFor={orthonormalizeId}>Orthonormalize</label>
          <input
            id={orthonormalizeId}
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
