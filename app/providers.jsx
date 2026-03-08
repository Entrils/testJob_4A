"use client";

import { Provider } from "react-redux";
import { getStore } from "@/shared/store/store";

const store = getStore();

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
