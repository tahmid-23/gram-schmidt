import { FC, useState } from 'react';
import VectorType from '../../vector/vector-type';
import VectorList from '../VectorList/VectorList';
import VectorTypeChooser from '../VectorTypeChooser/VectorTypeChooser';

interface VectorFormProps {
  onCalculate?: (vectorType: VectorType, vectors: string[]) => void;
}

const VectorForm: FC<VectorFormProps> = ({ onCalculate }) => {
  const [vectorType, setVectorType] = useState<VectorType>(VectorType.REGULAR);
  const [vectors, setVectors] = useState<string[]>([]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCalculate?.(vectorType, vectors);
        }}
      >
        <div>
          <VectorTypeChooser onChange={setVectorType} />
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
