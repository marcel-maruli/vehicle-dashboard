import { render, screen } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal component", () => {
  test("should render modal component", () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}}>
        test
      </Modal>,
    );
    expect(container).toBeInTheDocument();
  });

  test("should not render modal component", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        test
      </Modal>,
    );
    expect(screen.queryByText("test")).not.toBeInTheDocument();
  });
});
