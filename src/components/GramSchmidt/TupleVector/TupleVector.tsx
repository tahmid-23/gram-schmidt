export interface TupleVectorProps {
  vector: number[];
}

const TupleVector = ({ vector }: TupleVectorProps) => {
  if (vector.length === 0) {
    return null;
  }

  return <>{`(${vector.join(', ')})`}</>;
};

export default TupleVector;
