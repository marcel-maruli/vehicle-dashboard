import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("Layout component", () => {
  test("should applies layout styles", () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("w-screen");
    expect(wrapper).toHaveClass("h-screen");
    expect(wrapper).toHaveClass("bg-white");
  });

  test("should renders multiple children", () => {
    render(
      <Layout>
        <p>Child 1</p>
        <p>Child 2</p>
      </Layout>,
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
