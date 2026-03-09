import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PurchaseAction } from "./purchase-action";

describe("Компонент PurchaseAction", () => {
  test("вызывает обработчик покупки и рендерит сообщение и юридический текст", async () => {
    const user = userEvent.setup();
    const onBuyClick = jest.fn();

    render(
      <PurchaseAction
        buyLabel="Купить"
        onBuyClick={onBuyClick}
        buyMessage="Тариф выбран"
        legalText="Юридический текст"
      />
    );

    await user.click(screen.getByRole("button", { name: "Купить" }));

    expect(onBuyClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Тариф выбран")).toBeInTheDocument();
    expect(screen.getByText("Юридический текст")).toBeInTheDocument();
  });
});
