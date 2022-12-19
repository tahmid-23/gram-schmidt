import { gramSchmidtRegular } from './gram-schmidt';

const dotProduct = (a: number[], b: number[]) => {
  return a.reduce((accumulator, component, index) => {
    return accumulator + component * b[index];
  }, 0);
};

const EPSILON = 1e-10;
function areEqual(vectorA: number[], vectorB: number[]) {
  return vectorA.every(
    (component, index) => Math.abs(component - vectorB[index]) <= EPSILON
  );
}

function isLinearlyDependent(vectorA: number[], vectorB: number[]) {
  const projection =
    dotProduct(vectorA, vectorB) / dotProduct(vectorA, vectorA);
  return areEqual(
    vectorB,
    vectorA.map((component) => component * projection)
  );
}

test('Regular Gram-Schmidt in R2', () => {
  const vectors = [
    [2, 0],
    [1, 1],
  ];

  const adjusted = gramSchmidtRegular(vectors, false, dotProduct);

  expect(isLinearlyDependent(adjusted[0], vectors[0])).toBe(true);
  expect(isLinearlyDependent(adjusted[1], [0, 1])).toBe(true);
});

test('Orthonormal Gram-Schmidt in R2', () => {
  const vectors = [
    [2, 0],
    [1, 1],
  ];

  const adjusted = gramSchmidtRegular(vectors, true, dotProduct);

  expect(dotProduct(adjusted[0], adjusted[0])).toBe(1);
  expect(dotProduct(adjusted[1], adjusted[1])).toBe(1);
});
