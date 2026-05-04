import { render, screen } from "@testing-library/react";
import { StatusBadge } from "../StatusBadge";

describe("StatusBadge component", () => {
  test("should renders variant text when no children provided", () => {
    render(<StatusBadge variant="new" />);

    expect(screen.getByText("new")).toBeInTheDocument();
  });

  test("should renders children instead of variant", () => {
    render(<StatusBadge variant="new">Ticket Created</StatusBadge>);

    expect(screen.getByText("Ticket Created")).toBeInTheDocument();
  });

  test("should applies new status style", () => {
    render(<StatusBadge variant="new" />);

    const badge = screen.getByText("new");

    expect(badge).toHaveClass("text-blue-600");
  });

  test("should applies attending status style", () => {
    render(<StatusBadge variant="attending" />);

    const badge = screen.getByText("attending");

    expect(badge).toHaveClass("text-yellow-600");
  });

  test("should applies completed status style", () => {
    render(<StatusBadge variant="completed" />);

    const badge = screen.getByText("completed");

    expect(badge).toHaveClass("text-green-600");
  });

  test("should has base styling classes", () => {
    render(<StatusBadge variant="new" />);

    const badge = screen.getByText("new");

    expect(badge).toHaveClass("px-2");
    expect(badge).toHaveClass("py-1");
    expect(badge).toHaveClass("text-xs");
  });
});
