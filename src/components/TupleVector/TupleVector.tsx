import { FC } from 'react';

interface TupleVectorProps {
  vector: number[];
}

const TupleVector: FC<TupleVectorProps> = ({ vector }) => {
  if (!vector.length) {
    return null;
  }

  return <>{`(${vector.join(', ')})`}</>;
};

export default TupleVector;
