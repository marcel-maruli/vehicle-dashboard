import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button component", () => {
  test("should renders button with text", () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toBeInTheDocument();
  });

  test("should applies primary variant by default", () => {
    render(<Button>Click</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-blue-600");
  });

  test("should applies danger variant", () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-red-600");
  });

  test("should applies large size", () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-6");
  });

  test("should shows loading text when loading", () => {
    render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Loading...");
  });
  test("should button is disabled when loading", () => {
    render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
  test("should applies full width class", () => {
    render(<Button fullWidth>Submit</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("w-full");
  });

  test("should calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
