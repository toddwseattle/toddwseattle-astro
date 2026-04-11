// Copilot test instructions: Using vitest, mock subcomponents with vi.mock, and group tests in describe blocks

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import EraFilter from "./EraFilter";
import type { TimelineEra } from "../../data/timelines";

const eras: TimelineEra[] = [
  {
    id: "feature-phone-era",
    label: "Feature Phone Era",
    startYear: 1992,
    endYear: 2006,
  },
  {
    id: "smartphone-disruption",
    label: "Smartphone Disruption",
    startYear: 2007,
    endYear: 2012,
  },
];

describe("EraFilter", () => {
  it("renders all era options with the all-eras option by default", () => {
    render(<EraFilter eras={eras} selected={null} onSelect={vi.fn()} />);

    expect(
      screen.getByRole("radiogroup", { name: "Filter timeline by era" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "All Eras" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(
      screen.getByRole("radio", { name: "Feature Phone Era" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Smartphone Disruption" }),
    ).toBeInTheDocument();
  });

  it("calls onSelect with the chosen era", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<EraFilter eras={eras} selected={null} onSelect={onSelect} />);

    await user.click(screen.getByRole("radio", { name: "Feature Phone Era" }));

    expect(onSelect).toHaveBeenCalledWith(eras[0]);
  });

  it("clears the selected era when the selected era is clicked again", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<EraFilter eras={eras} selected={eras[1]} onSelect={onSelect} />);

    await user.click(
      screen.getByRole("radio", { name: "Smartphone Disruption" }),
    );

    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it("omits the all-eras option when showAll is false", () => {
    render(
      <EraFilter
        eras={eras}
        selected={eras[0]}
        onSelect={vi.fn()}
        showAll={false}
      />,
    );

    expect(
      screen.queryByRole("radio", { name: "All Eras" }),
    ).not.toBeInTheDocument();
  });
});
