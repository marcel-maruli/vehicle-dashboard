import { render, screen } from "@testing-library/react";
import LoadingModal from "../LoadingModal";

describe("LoadingSpinner component", () => {
  test("should render spinner component", () => {
    const { container } = render(<LoadingModal isLoading={true} />);
    expect(container).toBeInTheDocument();
  });

  test("should not render spinner component", () => {
    const { container } = render(<LoadingModal isLoading={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
