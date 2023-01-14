import { Header } from "./Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("Renders the header", async () => {
    const title = "title",
      description = "description";
    render(<Header title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
