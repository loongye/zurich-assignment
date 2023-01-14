import { Footer } from "./Footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  it("Renders the footer", async () => {
    const title = "title",
      description = "description";
    render(<Footer title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
