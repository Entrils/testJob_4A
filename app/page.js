import { TariffsPage } from "@/widgets/tariffs-page";
import { TARIFFS_ENDPOINT } from "@/shared/config/tariffs";

export const dynamic = "force-dynamic";

async function getInitialTariffs() {
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

    const payload = await response.json();

    return {
      tariffs: Array.isArray(payload) ? payload : [],
      error: null
    };
  } catch (error) {
    return {
      tariffs: [],
      error:
        error instanceof Error ? error.message : "Unknown tariffs loading error"
    };
  }
}

export default async function HomePage() {
  const { tariffs, error } = await getInitialTariffs();

  return <TariffsPage initialTariffs={tariffs} initialError={error} />;
}
