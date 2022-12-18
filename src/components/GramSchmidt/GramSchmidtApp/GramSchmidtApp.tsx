import { useState } from 'react';
import { gramSchmidtRegular } from '../../../vector/gram-schmidt';
import VectorType from '../../../vector/vector-type';
import Header from '../Header/Header';
import CalculationResult, {
  CalculationResultProps,
} from '../CalculationResult/CalculationResult';
import VectorForm from '../VectorForm/VectorForm';
import InnerProduct from '../../../vector/inner-product';

function parseTuples(vectors: string[]) {
  const mappedVectors: number[][] = [];
  let dimension = 0;
  for (const vector of vectors) {
    const newVector = vector.split(',').map((component) => Number(component));
    if (newVector.length > dimension) {
      dimension = newVector.length;
    }

    mappedVectors.push(newVector);
  }

  for (const vector of mappedVectors) {
    if (vector.length < dimension) {
      vector.push(0);
    }
  }

  return mappedVectors;
}

const GramSchmidtApp = () => {
  const [resultData, setResultData] = useState<CalculationResultProps>();

  const onCalculate = (
    vectorType: VectorType,
    orthonormalize: boolean,
    innerProduct: InnerProduct<unknown>,
    vectors: string[]
  ) => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        const mappedVectors = parseTuples(vectors);
        setResultData({
          vectorType: vectorType,
          vectors: gramSchmidtRegular(
            mappedVectors,
            orthonormalize,
            innerProduct
          ),
        });

        break;
      }
    }
  };

  return (
    <>
      <Header />
      <VectorForm onCalculate={onCalculate} />
      {resultData && <CalculationResult {...resultData} />}
    </>
  );
};

export default GramSchmidtApp;
