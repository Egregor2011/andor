import { describe, expect, it } from "vitest";
import { getEvaluation } from "./index";

describe("getting result", () => {
  it("should return expected result", () => {
    const result = getEvaluation({
      case: true,
      and: () => "true",
      or: () => "false",
    });
    expect(result).toBe("true");
  });
  it("could return a passed function result", () => {
    const result = getEvaluation(() => "result");
    expect(result).toBe("result");
  });
});
