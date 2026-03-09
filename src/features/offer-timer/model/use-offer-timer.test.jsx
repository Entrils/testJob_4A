import { act, renderHook } from "@testing-library/react";
import { useOfferTimer } from "./use-offer-timer";

describe("Хук useOfferTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("ведет обратный отсчет до нуля и помечает таймер как завершенный", () => {
    const { result } = renderHook(() => useOfferTimer(2));

    expect(result.current.formattedTime).toBe("00:02");
    expect(result.current.isExpired).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.formattedTime).toBe("00:01");
    expect(result.current.isExpired).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.formattedTime).toBe("00:00");
    expect(result.current.isExpired).toBe(true);
  });

  test("включает alert-состояние при 30 секундах и ниже", () => {
    const { result } = renderHook(() => useOfferTimer(31));

    expect(result.current.isAlert).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(30);
    expect(result.current.isAlert).toBe(true);
  });
});
