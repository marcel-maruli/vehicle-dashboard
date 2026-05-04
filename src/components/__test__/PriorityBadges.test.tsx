import { render, screen } from "@testing-library/react";
import { PriorityBadge } from "../PriorityBadge";

describe("PriorityBadge component", () => {
  test("should renders variant text when children not provided", () => {
    render(<PriorityBadge variant="high" />);

    expect(screen.getByText("high")).toBeInTheDocument();
  });

  test("should renders children instead of variant", () => {
    render(<PriorityBadge variant="high">Urgent</PriorityBadge>);

    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });

  test("should applies high priority styles", () => {
    render(<PriorityBadge variant="high" />);

    const badge = screen.getByText("high");

    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-700");
  });

  test("should applies medium priority styles", () => {
    render(<PriorityBadge variant="medium" />);

    const badge = screen.getByText("medium");

    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-700");
  });

  test("should applies low priority styles", () => {
    render(<PriorityBadge variant="low" />);

    const badge = screen.getByText("low");

    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-700");
  });

  test("should applies custom className", () => {
    render(<PriorityBadge variant="low" className="custom-class" />);

    const badge = screen.getByText("low");

    expect(badge).toHaveClass("custom-class");
  });
});
