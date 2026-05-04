import { render, screen } from "@testing-library/react";
import LoadingModal from "../LoadingModal";

describe("LoadingModal component", () => {
  test("should does not render when isLoading is false", () => {
    const { container } = render(<LoadingModal isLoading={false} />);
    expect(container.firstChild).toBeNull();
  });

  test("should renders loading modal when isLoading is true", () => {
    render(<LoadingModal isLoading={true} />);
    expect(screen.getByText("Loading, please wait...")).toBeInTheDocument();
  });

  test("should renders LoadingSpinner", () => {
    render(<LoadingModal isLoading={true} />);
    const text = screen.getByText("Loading, please wait...");
    expect(text).toBeInTheDocument();
  });
});
