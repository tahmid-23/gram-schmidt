import { Children, FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import VectorType from '../../../vector/vector-type';
import VectorInput from '../VectorEntry/VectorEntry';

interface VectorListProps {
  vectorType: VectorType;
  onChange?: (vectors: string[]) => void;
}

const VectorList: FC<VectorListProps> = ({ vectorType, onChange }) => {
  const [vectors, setVectors] = useState<string[]>([]);

  useEffect(() => {
    onChange?.(vectors);
  }, [onChange, vectors]);

  const eraseVector = (index: number) => {
    const newVectors = [...vectors];
    newVectors.splice(index, 1);
    setVectors(newVectors);
  };

  const mapVectors = () => {
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
  };

  const addVector = () => {
    setVectors(vectors.concat(''));
  };

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
