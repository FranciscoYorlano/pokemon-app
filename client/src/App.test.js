import { render, screen } from "@testing-library/react";
import Navbar from "./components/navbar/Navbar";

test("Renders Filters in Navbar", () => {
    render(<Navbar />);
    const linkElement = screen.getByText(/Filters/i);
    expect(linkElement).toBeInTheDocument();
});
