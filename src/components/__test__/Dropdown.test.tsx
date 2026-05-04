import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "../Dropdown";

type Option = {
  label: string;
  value: string | number;
};

const options: Option[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

describe("Dropdown component", () => {
  test("should renders placeholder when no value selected", () => {
    render(<Dropdown options={options} placeholder="Select option" />);

    expect(screen.getByText("Select option")).toBeInTheDocument();
  });

  test("should opens dropdown when button is clicked", async () => {
    const user = userEvent.setup();

    render(<Dropdown options={options} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
  test("should select option when clicked", async () => {
    const user = userEvent.setup();

    render(<Dropdown options={options} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Option 1"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });
  test("should calls onChange when option selected", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Dropdown options={options} onChange={handleChange} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Option 2"));

    expect(handleChange).toHaveBeenCalledWith({
      label: "Option 2",
      value: "2",
    });
  });
});
