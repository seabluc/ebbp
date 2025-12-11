import { ThemeToggle } from "@/components/theme-toggle";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "next-themes";

beforeAll(() => {
  // matchMedia: browser API used by next-themes to detect system theme
  // mock matchMedia needed as test environment (JSDOM) does not implement matchMedia
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: () => { },
      removeListener: () => { },
      addEventListener: () => { },
      removeEventListener: () => { },
      dispatchEvent: () => false,
    };
  };
});

function renderWithTheme(ui) {
  return render(
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      storageKey="theme"
    >
      {ui}
    </ThemeProvider>
  )
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("shows sun icon when theme is in light mode", () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("shows moon icon when theme is in dark mode", async () => {
    renderWithTheme(<ThemeToggle />);
    const user = userEvent.setup();
    const btn = screen.getByRole("button");

    await user.click(btn);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("updates the html class when the theme changes", async () => {
    renderWithTheme(<ThemeToggle />);
    const user = userEvent.setup();
    const btn = screen.getByRole("button");

    expect(document.documentElement).toHaveClass("light");

    await user.click(btn);
    expect(document.documentElement).toHaveClass("dark");
  });

  it("initializes theme from localStorage on mount", () => {
    localStorage.setItem("theme", "dark");
    renderWithTheme(<ThemeToggle />);

    expect(document.documentElement).toHaveClass("dark");
  });

  // persists new theme to lcoalStorage when toggled too
  it("toggles between light and dark modes on repeated clicks", async () => {
    renderWithTheme(<ThemeToggle />);
    const user = userEvent.setup();
    const btn = screen.getByRole("button");

    await user.click(btn);
    expect(localStorage.getItem("theme")).toBe("dark");

    await user.click(btn);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});