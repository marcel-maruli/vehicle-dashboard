import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input component", () => {
  test("should renders label", () => {
    render(<Input name="email" label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("should renders input element", () => {
    render(<Input name="username" label="Username" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
  test("should renders placeholder", () => {
    render(<Input name="email" label="Email" placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  test("should renders prefix element", () => {
    render(<Input name="price" label="Price" prefix={<span>$</span>} />);
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  test("should renders suffix element", () => {
    render(<Input name="weight" label="Weight" suffix={<span>kg</span>} />);
    expect(screen.getByText("kg")).toBeInTheDocument();
  });

  test("should renders error message", () => {
    render(<Input name="email" label="Email" errorMsg="Email is required" />);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
  test("should calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input name="username" label="Username" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "john");
    expect(handleChange).toHaveBeenCalled();
  });
});
