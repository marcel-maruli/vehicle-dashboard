import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "../ToastProvider";

const mockNavigate = jest.fn();

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("@/utils/getUserInfo", () => ({
  getUserInfo: jest.fn(() => ({
    username: "marcel",
    role: { name: "Helpdesk Agent", id: 1 },
  })),
}));

describe("Navbar component", () => {
  test("should logout when button clicked", async () => {
    render(
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </ToastProvider>,
    );
    const button = screen.getByText("Logout");
    await userEvent.click(button);
  });

  test("should show username data", async () => {
    render(
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </ToastProvider>,
    );

    expect(screen.getByText("marcel")).toBeInTheDocument();
  });
});
