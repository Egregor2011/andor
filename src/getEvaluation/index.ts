type Edge<T, I> = T | (() => I);

type Option<T> = {
  case: boolean;
  and: Edge<Option<T>, T>;
  or: Edge<Option<T>, T>;
};

export const getEvaluation = <T>(edge: Edge<Option<T>, T>): T => {
  if (typeof edge === "function") {
    return edge();
  }
  return getEvaluation(edge.case ? edge.and : edge.or);
};
