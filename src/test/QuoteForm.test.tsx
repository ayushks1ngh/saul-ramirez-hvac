import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import QuoteForm from "@/components/QuoteForm";

// Mock the api module
vi.mock("@/lib/api", () => ({
  api: {
    createLead: vi.fn(),
  },
}));

import { api } from "@/lib/api";

const renderForm = () =>
  render(
    <BrowserRouter>
      <QuoteForm />
    </BrowserRouter>
  );

describe("QuoteForm", () => {
  it("renders all form fields", () => {
    renderForm();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Service")).toBeInTheDocument();
    expect(screen.getByText("Request Free Quote")).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    (api.createLead as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ id: "1" });
    renderForm();

    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "4691234567" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@test.com" } });
    fireEvent.change(screen.getByLabelText("Select Service"), { target: { value: "AC Repair" } });
    fireEvent.click(screen.getByText("Request Free Quote"));

    await waitFor(() => {
      expect(screen.getByText("Thank You!")).toBeInTheDocument();
    });
  });

  it("shows error message on API failure", async () => {
    (api.createLead as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Server error"));
    renderForm();

    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "4691234567" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "john@test.com" } });
    fireEvent.change(screen.getByLabelText("Select Service"), { target: { value: "AC Repair" } });
    fireEvent.click(screen.getByText("Request Free Quote"));

    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });
});
