import { render, screen, fireEvent, act } from "@testing-library/react";
import { ToastProvider, useToast } from "../ToastProvider";

jest.useFakeTimers();

function TestComponent() {
  const { showToast } = useToast();

  return (
    <button onClick={() => showToast("Hello world", "success")}>
      Show Toast
    </button>
  );
}

describe("ToastProvider component", () => {
  test("should shows toast when showToast is called", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Show Toast"));

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  test("should applies correct color based on type", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Show Toast"));

    const toast = screen.getByText("Hello world");

    expect(toast).toHaveClass("bg-green-600");
  });

  test("should removes toast after 3 seconds", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Show Toast"));

    expect(screen.getByText("Hello world")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("Hello world")).not.toBeInTheDocument();
  });

  test("should throws error if useToast used outside provider", () => {
    const BrokenComponent = () => {
      useToast();
      return <div />;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useToast must be used inside ToastProvider",
    );
  });
});
