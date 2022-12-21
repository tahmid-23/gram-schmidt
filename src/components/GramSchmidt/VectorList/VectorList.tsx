import { Children, useCallback } from 'react';
import { useState } from 'react';
import VectorType from '../../../vector/vector-type';
import VectorInput from '../VectorEntry/VectorEntry';

export interface VectorListProps {
  vectorType: VectorType;
  onChange?: (vectors: string[]) => void;
}

const VectorList = ({ vectorType, onChange }: VectorListProps) => {
  const [vectors, setVectors] = useState<string[]>([]);

  const eraseVector = useCallback(
    (index: number) => {
      const newVectors = [...vectors];
      newVectors.splice(index, 1);
      setVectors(newVectors);
      onChange?.(newVectors);
    },
    [onChange, vectors]
  );

  const mapVectors = useCallback(() => {
    return Children.map(vectors, (_vector, index) => (
      <VectorInput
        key={index}
        vectorType={vectorType}
        onChange={(newInput) => {
          vectors[index] = newInput;
        }}
        onDelete={() => {
          eraseVector(index);
        }}
      />
    ));
  }, [eraseVector, vectorType, vectors]);

  const addVector = useCallback(() => {
    const newVectors = vectors.concat('');
    setVectors(newVectors);
    onChange?.(newVectors);
  }, [onChange, vectors]);

  return (
    <>
      <ol>{mapVectors()}</ol>
      <button type="button" onClick={addVector}>
        Add Vector
      </button>
    </>
  );
};

export default VectorList;
