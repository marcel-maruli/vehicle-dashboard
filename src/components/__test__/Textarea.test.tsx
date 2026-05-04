import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "../Textarea";

describe("Textarea component", () => {
  test("should renders label and textarea", () => {
    render(<Textarea name="description" label="Description" />);

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should shows required indicator", () => {
    render(<Textarea name="desc" label="Description" required />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("should renders placeholder", () => {
    render(
      <Textarea
        name="desc"
        label="Description"
        placeholder="Enter description"
      />,
    );

    expect(
      screen.getByPlaceholderText("Enter description"),
    ).toBeInTheDocument();
  });

  test("should shows error message", () => {
    render(
      <Textarea
        name="desc"
        label="Description"
        errorMsg="This field is required"
      />,
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  test("should calls onChange when typing", () => {
    const handleChange = jest.fn();

    render(
      <Textarea name="desc" label="Description" onChange={handleChange} />,
    );

    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, {
      target: { value: "hello" },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  test("should applies resize style when isResize is true", () => {
    render(<Textarea name="desc" label="Description" isResize />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveStyle("resize: both");
  });

  test("applies default resize none", () => {
    render(<Textarea name="desc" label="Description" />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveStyle("resize: none");
  });
});
