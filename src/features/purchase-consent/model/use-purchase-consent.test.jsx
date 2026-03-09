import { act, renderHook } from "@testing-library/react";
import { usePurchaseConsent } from "./use-purchase-consent";

describe("Хук usePurchaseConsent", () => {
  test("ставит ошибку, когда validateConsent вызывается без отмеченного чекбокса", () => {
    const { result } = renderHook(() => usePurchaseConsent());

    expect(result.current.isChecked).toBe(false);
    expect(result.current.hasError).toBe(false);

    act(() => {
      expect(result.current.validateConsent()).toBe(false);
    });

    expect(result.current.hasError).toBe(true);
  });

  test("сбрасывает ошибку после переключения согласия в true", () => {
    const { result } = renderHook(() => usePurchaseConsent());

    act(() => {
      result.current.validateConsent();
    });

    expect(result.current.hasError).toBe(true);

    act(() => {
      result.current.toggleConsent();
    });

    expect(result.current.isChecked).toBe(true);
    expect(result.current.hasError).toBe(false);
  });
});
