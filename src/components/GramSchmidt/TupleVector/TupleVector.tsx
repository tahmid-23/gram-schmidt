import { FC } from 'react';

interface TupleVectorProps {
  vector: number[];
}

const TupleVector: FC<TupleVectorProps> = ({ vector }) => {
  if (vector.length === 0) {
    return null;
  }

  return <>{`(${vector.join(', ')})`}</>;
};

export default TupleVector;
