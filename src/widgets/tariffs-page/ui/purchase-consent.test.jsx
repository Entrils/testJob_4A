import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PurchaseConsent } from "./purchase-consent";

describe("Компонент PurchaseConsent", () => {
  const baseProps = {
    isChecked: false,
    hasError: false,
    toggleConsent: jest.fn(),
    consentPrefix: "Я согласен с ",
    consentOffer: "офертой",
    consentAnd: " и ",
    consentPolicy: "политикой"
  };

  test("вызывает toggleConsent при клике по чекбоксу", async () => {
    const user = userEvent.setup();
    const toggleConsent = jest.fn();

    render(<PurchaseConsent {...baseProps} toggleConsent={toggleConsent} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(toggleConsent).toHaveBeenCalledTimes(1);
  });

  test("показывает красную рамку при hasError=true", () => {
    render(<PurchaseConsent {...baseProps} hasError />);

    const checkbox = screen.getByRole("checkbox");
    const indicator = checkbox.nextElementSibling;

    expect(indicator).toHaveClass("border-[#FF5667]");
  });
});
