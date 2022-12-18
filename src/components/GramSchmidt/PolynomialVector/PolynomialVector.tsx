import { FC } from 'react';

interface PolynomialVectorProps {
  vector: string;
}

const PolynomialVector: FC<PolynomialVectorProps> = ({ vector }) => {
  return <>{vector}</>;
};

export default PolynomialVector;
