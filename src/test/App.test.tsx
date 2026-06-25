import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// Test the routes by rendering the Layout pattern directly
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{children}</TooltipProvider>
  </QueryClientProvider>
);

describe("App routing", () => {
  it("renders homepage content", () => {
    render(
      <Wrapper>
        <MemoryRouter>
          <Navbar />
          <Index />
          <Footer />
        </MemoryRouter>
      </Wrapper>
    );
    expect(screen.getByRole("heading", { level: 1, name: /Saul Ramirez Heating/i })).toBeInTheDocument();
  });

  it("renders 404 page", () => {
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/nonexistent"]}>
          <NotFound />
        </MemoryRouter>
      </Wrapper>
    );
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
