import { render, screen } from "@testing-library/react";
import MainLayout from "../MainLayout";

jest.mock("../Navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar" />,
}));

describe("MainLayout component", () => {
  test("renders Navbar", () => {
    render(
      <MainLayout>
        <p>Content</p>
      </MainLayout>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("should renders children content", () => {
    render(
      <MainLayout>
        <p>Dashboard Content</p>
      </MainLayout>,
    );

    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });

  test("should applies layout styles", () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>,
    );

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("w-screen");
    expect(wrapper).toHaveClass("h-screen");
    expect(wrapper).toHaveClass("bg-gray-300");
  });
});
