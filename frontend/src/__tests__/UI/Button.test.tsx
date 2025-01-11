import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../UI/Button";
describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(
      <Button buttonName="Click Me" styles="bg-blue-500" onClick={() => {}} />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  test("applies custom styles correctly", () => {
    const customStyle = "bg-red-500 text-white";
    render(
      <Button
        buttonName="Styled Button"
        styles={customStyle}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole("button")).toHaveClass(customStyle);
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button buttonName="Clickable" styles="" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders without crashing when minimal props provided", () => {
    render(<Button buttonName="" styles="" onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
