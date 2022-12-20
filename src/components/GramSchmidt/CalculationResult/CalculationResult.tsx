import { Children, ReactFragment } from 'react';
import VectorType from '../../../vector/vector-type';
import PolynomialVector from '../PolynomialVector/PolynomialVector';
import TupleVector from '../TupleVector/TupleVector';

export interface CalculationResultProps {
  vectorType: VectorType;
  vectors: unknown[];
}

const CalculationResult = ({ vectorType, vectors }: CalculationResultProps) => {
  let vectorFragments: ReactFragment;
  switch (vectorType) {
    case VectorType.REGULAR: {
      vectorFragments = (vectors as number[][]).map((vector, index) => (
        <TupleVector key={index} vector={vector} />
      ));
      break;
    }
    case VectorType.POLYNOMIAL: {
      vectorFragments = (vectors as string[]).map((vector, index) => (
        <PolynomialVector key={index} vector={vector} />
      ));
      break;
    }
  }

  return (
    <>
      <p>Result:</p>
      <ol>
        {Children.map(vectorFragments, (fragment, index) => {
          return <li key={index}>{fragment}</li>;
        })}
      </ol>
    </>
  );
};

export default CalculationResult;
