import { getTariffs } from "@/shared/api/tariffs/get-tariffs";
import { normalizeTariffs } from "@/entities/tariff/model/normalize-tariffs";
import { TariffsPage } from "@/widgets/tariffs-page";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const response = await getTariffs();
  const tariffs = normalizeTariffs(response.tariffs);

  return <TariffsPage initialTariffs={tariffs} initialError={response.error} />;
}
