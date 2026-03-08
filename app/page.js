import { TariffsPage } from "@/widgets/tariffs-page";
import { TARIFFS_ENDPOINT } from "@/shared/config/tariffs";
import { getSiteUrl } from "@/shared/config/seo";

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

function buildStructuredData(tariffs) {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL("/", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "4A Тестовое задание",
    description:
      "4A Тестовое задание - Тарифы фитнеса.",
    inLanguage: "ru",
    url: pageUrl,
    mainEntity: {
      "@type": "OfferCatalog",
      name: "4A Тестовое задание",
      itemListElement: tariffs.map((tariff, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: String(tariff?.period ?? ""),
        description: String(tariff?.text ?? ""),
        priceCurrency: "RUB",
        price: Number(tariff?.price ?? 0),
        availability: "https://schema.org/InStock"
      }))
    }
  };
}

export default async function HomePage() {
  const { tariffs, error } = await getInitialTariffs();
  const structuredData = buildStructuredData(tariffs);

  return (
    <>
      <TariffsPage initialTariffs={tariffs} initialError={error} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
