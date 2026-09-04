import { expect, test } from "vitest";
import { cn } from "./utils";

test("cn merges class names and drops falsy values", () => {
  expect(cn("a", false && "b", "c")).toBe("a c");
});

test("cn resolves conflicting tailwind classes to the last one", () => {
  expect(cn("px-2", "px-4")).toBe("px-4");
});
