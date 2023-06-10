type Edge<T, I> = T | (() => I);

type Option<T> = {
  case: boolean;
  and: Edge<Option<T>, T>;
  or: Edge<Option<T>, T>;
};

export const getEvaluation = <T>(graph: Edge<Option<T>, T>): T => {
  if (typeof graph === "function") {
    return graph();
  }
  return getEvaluation(graph.case ? graph.and : graph.or);
};
