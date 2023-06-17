type CaseScheme<T, I> = {
  switch: string | null | undefined;
  default: I;
  cases: T extends string ? Record<T, I> : Record<string, I>;
};

export const getCase = <T, I = string>(
  caseScheme: CaseScheme<T extends string ? T : string, I>
): I => {
  return caseScheme.cases[caseScheme.switch ?? ""] ?? caseScheme.default;
};
