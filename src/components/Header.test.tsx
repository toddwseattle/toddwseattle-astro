import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header", () => {
  it("renders the site logo and name", () => {
    render(<Header />);
    expect(screen.getByText("Todd Warren")).toBeInTheDocument();
    expect(screen.getByText("TW")).toBeInTheDocument();
  });

  it("renders all six navigation items in desktop nav", () => {
    render(<Header />);
    
    // Check for all six navigation items
    const navItems = ["Home", "Teaching", "Writing", "AutoSoft Today", "Consulting", "About"];
    
    navItems.forEach((item) => {
      const links = screen.getAllByText(item);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("renders navigation links with correct href attributes", () => {
    render(<Header />);
    
    const expectedLinks = [
      { text: "Home", href: "/" },
      { text: "Teaching", href: "/teaching/" },
      { text: "Writing", href: "/writing/" },
      { text: "AutoSoft Today", href: "/autosoft-today/" },
      { text: "Consulting", href: "/consulting/" },
      { text: "About", href: "/about/" },
    ];
    
    expectedLinks.forEach(({ text, href }) => {
      const links = screen.getAllByRole("link", { name: text });
      expect(links.some((link) => link.getAttribute("href") === href)).toBe(true);
    });
  });

  it("renders mobile menu toggle button", () => {
    render(<Header />);
    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    expect(toggleButton).toBeInTheDocument();
  });

  it("toggles mobile menu when button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    
    // Initially, mobile nav should not be visible (check for duplicate links)
    const initialLinks = screen.getAllByText("Home");
    const initialCount = initialLinks.length;
    
    // Click to open mobile menu
    await user.click(toggleButton);
    
    // After clicking, should have more links (desktop + mobile)
    const expandedLinks = screen.getAllByText("Home");
    expect(expandedLinks.length).toBeGreaterThan(initialCount);
  });

  it("does not render legacy Gatsby navigation items", () => {
    render(<Header />);
    
    // These were the old navigation items that should no longer exist
    const legacyItems = ["About Me", "Resume", "Blog", "Contact Me"];
    
    legacyItems.forEach((item) => {
      expect(screen.queryByText(item)).not.toBeInTheDocument();
    });
  });
});
