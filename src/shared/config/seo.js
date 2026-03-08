const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeEnvUrl(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return null;
  }

  return trimmed;
}

export function getSiteUrl() {
  const raw = normalizeEnvUrl(process.env.NEXT_PUBLIC_SITE_URL);

  if (raw) {
    try {
      return new URL(raw).toString();
    } catch {
      try {
        return new URL(`https://${raw}`).toString();
      } catch {
        return DEFAULT_SITE_URL;
      }
    }
  }

  return DEFAULT_SITE_URL;
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl());
}
