import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function renderApp(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>,
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("store pages", () => {
  it("searches by product name and shows an empty state when there are no matches", async () => {
    const user = userEvent.setup();
    renderApp("/shop");

    await user.type(screen.getByRole("searchbox", { name: "Search products by name" }), "candle");
    expect(screen.getByText("Slow Morning Candle")).toBeInTheDocument();
    expect(screen.queryByText("Everyday Canvas Tote")).not.toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox", { name: "Search products by name" }));
    await user.type(screen.getByRole("searchbox", { name: "Search products by name" }), "no such piece");
    expect(screen.getByRole("status")).toHaveTextContent("No pieces found");
  });

  it("filters by category and sorts prices from high to low", async () => {
    const user = userEvent.setup();
    const { container } = renderApp("/shop");

    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by category" }), "Bags");
    expect(screen.getByText("Everyday Canvas Tote")).toBeInTheDocument();
    expect(screen.queryByText("Blue Glass Drop Earrings")).not.toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: "Sort products" }), "high-to-low");
    const cards = container.querySelectorAll(".product-card .product-name");
    expect(cards[0]).toHaveTextContent("The Field Backpack");
  });

  it("opens a product by its URL id and handles invalid products and routes", () => {
    const { unmount } = renderApp("/product/field-watch");
    expect(screen.getByRole("heading", { name: "The Field Watch" })).toBeInTheDocument();

    unmount();
    renderApp("/product/not-a-product");
    expect(screen.getByRole("heading", { name: "We couldn't find that piece" })).toBeInTheDocument();
  });

  it("renders the home and about pages", () => {
    const { unmount } = renderApp("/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Good things");

    unmount();
    renderApp("/about");
    expect(screen.getByRole("heading", { name: "We believe good things should feel good, too." })).toBeInTheDocument();
    expect(screen.getByText("Choose with care")).toBeInTheDocument();
  });

  it("validates the contact form and shows a confirmation after a valid submission", async () => {
    const user = userEvent.setup();
    renderApp("/contact");

    await user.click(screen.getByRole("button", { name: "Send your note" }));
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Your name"), "Taylor Reed");
    await user.type(screen.getByLabelText("Email address"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Send your note" }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Email address"));
    await user.type(screen.getByLabelText("Email address"), "taylor@example.com");
    await user.type(screen.getByLabelText("Subject"), "A question");
    await user.type(screen.getByLabelText("Your message"), "Could you tell me more?");
    await user.click(screen.getByRole("button", { name: "Send your note" }));

    expect(screen.getByRole("status")).toHaveTextContent("Thank you for your note");
  });

  it("adds a product, updates its quantity, saves it, and restores it after remounting", async () => {
    const user = userEvent.setup();
    const { unmount } = renderApp("/shop");

    await user.click(screen.getByRole("button", { name: "Add The Field Backpack to cart" }));
    await user.click(screen.getByRole("link", { name: "Shopping bag, 1 items" }));

    const quantity = screen.getByLabelText("Quantity for The Field Backpack");
    await user.click(within(quantity).getByRole("button", { name: "Increase The Field Backpack quantity" }));
    expect(within(quantity).getByText("2")).toBeInTheDocument();
    await user.click(within(quantity).getByRole("button", { name: "Decrease The Field Backpack quantity" }));
    expect(within(quantity).getByText("1")).toBeInTheDocument();
    await user.click(within(quantity).getByRole("button", { name: "Increase The Field Backpack quantity" }));
    expect(within(quantity).getByText("2")).toBeInTheDocument();
    expect(localStorage.getItem("morrow-and-moss-cart")).toContain('"quantity":2');

    unmount();
    renderApp("/cart");
    expect(screen.getByText("The Field Backpack")).toBeInTheDocument();
    expect(within(screen.getByLabelText("Quantity for The Field Backpack")).getByText("2")).toBeInTheDocument();
    const totalRow = screen.getByText("Total").parentElement;
    expect(within(totalRow).getByText("$296.00")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove The Field Backpack" }));
    expect(screen.getByRole("heading", { name: "Nothing in here just yet." })).toBeInTheDocument();
  });

  it("clears the entire bag", async () => {
    const user = userEvent.setup();
    renderApp("/shop");

    await user.click(screen.getByRole("button", { name: "Add The Field Backpack to cart" }));
    await user.click(screen.getByRole("button", { name: "Add Everyday Canvas Tote to cart" }));
    await user.click(screen.getByRole("link", { name: "Shopping bag, 2 items" }));
    await user.click(screen.getByRole("button", { name: "Clear bag" }));

    expect(screen.getByRole("heading", { name: "Nothing in here just yet." })).toBeInTheDocument();
  });

  it("recovers from corrupted cart data without crashing", () => {
    localStorage.setItem("morrow-and-moss-cart", "{not valid json");
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

    renderApp("/cart");

    expect(screen.getByRole("heading", { name: "Nothing in here just yet." })).toBeInTheDocument();
    expect(warning).toHaveBeenCalled();
  });

  it("shows a working empty state for an unknown route", () => {
    renderApp("/somewhere-else");
    expect(screen.getByRole("heading", { name: "This page took a little detour" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
