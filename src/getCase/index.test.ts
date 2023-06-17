import { describe, expect, it } from "vitest";
import { getCase } from "./index";

describe("getting result", () => {
  it("should return expected result", () => {
    const result = getCase({
      switch: "true",
      default: "It's neither",
      cases: {
        true: "It's true",
        false: "It's false",
      },
    });
    expect(result).toBe("It's true");
  });
  it("should return default result", () => {
    const result = getCase({
      switch: undefined,
      default: "It's neither",
      cases: {
        true: "It's true",
        false: "It's false",
      },
    });
    expect(result).toBe("It's neither");
  });
});
