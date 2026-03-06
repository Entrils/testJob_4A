import { TARIFFS_ENDPOINT } from "@/shared/config/tariffs";

export async function getTariffs() {
  try {
    const response = await fetch(TARIFFS_ENDPOINT, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        tariffs: [],
        error: `Failed to load tariffs: ${response.status}`
      };
    }

    const tariffs = await response.json();

    return {
      tariffs: Array.isArray(tariffs) ? tariffs : [],
      error: null
    };
  } catch (error) {
    return {
      tariffs: [],
      error:
        error instanceof Error
          ? error.message
          : "Unknown tariffs loading error"
    };
  }
}
