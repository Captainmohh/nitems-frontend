import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StatCardGrid } from "./stat-card-grid";

test("StatCardGrid renders without crashing", () => {
  const { container } = render(<StatCardGrid />);
  expect(container).toBeDefined();
});
