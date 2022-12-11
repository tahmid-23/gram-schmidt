import InnerProduct, { norm } from './inner-product';

const EPSILON = 1e-10;

export function gramSchmidt<T>(
  vectors: T[],
  orthonormalize: boolean,
  innerProduct: InnerProduct<T>,
  reduce: (vector: T) => T,
  add: (vectorA: T, vectorB: T) => T,
  multiply: (vector: T, factor: number) => T
): T[] {
  vectors = vectors
    .map(reduce)
    .filter((vector) => norm(innerProduct, vector) !== 0);
  if (vectors.length === 0) {
    return [];
  }

  let result = [];
  for (const initialVector of vectors) {
    let resultVector = initialVector;
    for (const orthogonalVector of result) {
      const projection =
        innerProduct(orthogonalVector, initialVector) /
        innerProduct(orthogonalVector, orthogonalVector);
      const delta = multiply(orthogonalVector, -projection);
      resultVector = add(resultVector, delta);
    }

    resultVector = reduce(resultVector);
    const vectorNorm = norm(innerProduct, resultVector);
    if (vectorNorm !== 0) {
      if (orthonormalize) {
        resultVector = multiply(resultVector, 1 / vectorNorm);
      }

      result.push(resultVector);
    }
  }

  return result;
}

export function gramSchmidtRegular(
  vectors: number[][],
  orthonormalize: boolean,
  innerProduct: InnerProduct<number[]>
): number[][] {
  return gramSchmidt(
    vectors,
    orthonormalize,
    innerProduct,
    (vector) =>
      vector.map((component) =>
        Math.abs(component) < EPSILON ? 0 : component
      ),
    (a, b) => {
      return a.map((component, index) => component + b[index]);
    },
    (vector, factor) => {
      return vector.map((component) => component * factor);
    }
  );
}
