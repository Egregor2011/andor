import { describe, expect, it } from "vitest";
import { getAndOr } from "./index";

describe("getting result", () => {
  it("should return expected result", () => {
    const result = getAndOr({
      case: true,
      and: () => "true",
      or: () => "false",
    });
    expect(result).toBe("true");
  });
  it("could return a passed function result", () => {
    const result = getAndOr(() => "result");
    expect(result).toBe("result");
  });
});
