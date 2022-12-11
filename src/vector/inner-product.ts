interface InnerProduct<T> {
  (vectorA: T, vectorB: T): number;
}

export function norm<T>(innerProduct: InnerProduct<T>, vector: T): number {
  return Math.sqrt(innerProduct(vector, vector));
}

export default InnerProduct;
