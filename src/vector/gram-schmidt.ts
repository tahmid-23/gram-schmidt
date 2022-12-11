import InnerProduct, { norm } from './inner-product';

const EPSILON = 1e-10;

function normalize(
  innerProduct: InnerProduct<number[]>,
  vector: number[]
): number[] | undefined {
  const vectorNorm = norm(innerProduct, vector);

  if (vectorNorm < EPSILON) {
    return undefined;
  }

  return vector.map((component) => {
    return component / vectorNorm;
  });
}

export function gramSchmidtRegular(
  vectors: number[][],
  innerProduct: InnerProduct<number[]>
): number[][] {
  vectors = vectors.filter((vector) =>
    vector.some((component) => component !== 0)
  );
  if (!vectors.length) {
    return [];
  }

  const result = [normalize(innerProduct, vectors[0])!];
  for (let i = 1; i < vectors.length; ++i) {
    let nextVector = vectors[i];
    for (const vector of result) {
      const projection = innerProduct(vector, vectors[i]);
      const delta = vector.map((component) => {
        return (component *= projection);
      });
      nextVector = nextVector.map((component, index) => {
        return component - delta[index];
      });
    }

    const resultVector = normalize(innerProduct, nextVector);
    if (resultVector) {
      result.push(resultVector);
    }
  }

  return result;
}
