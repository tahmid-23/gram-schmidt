import { useState } from 'react';
import { gramSchmidtRegular } from '../../vector/gram-schmidt';
import VectorType from '../../vector/vector-type';
import Header from '../Header/Header';
import CalculationResult, {
  CalculationResultProps,
} from '../CalculationResult/CalculationResult';
import VectorForm from '../VectorForm/VectorForm';

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

const dotProduct = (a: number[], b: number[]) => {
  return a.reduce((accumulator, component, index) => {
    return accumulator + component * b[index];
  }, 0);
};

const App = () => {
  const [resultData, setResultData] = useState<CalculationResultProps>();

  const onCalculate = (vectorType: VectorType, vectors: string[]) => {
    switch (vectorType) {
      case VectorType.REGULAR: {
        const mappedVectors = parseTuples(vectors);
        setResultData({
          vectorType: vectorType,
          vectors: gramSchmidtRegular(mappedVectors, dotProduct),
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

export default App;
