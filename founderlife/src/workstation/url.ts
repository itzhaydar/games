export function validateWebsite(
  input: string,
): { url: string; error?: never } | { url?: never; error: string } {
  const raw = input.trim();
  if (!raw) return { error: "Enter an HTTPS website address." };
  if (raw.length > 2048 || /[\u0000-\u0020\u007f]/.test(raw))
    return {
      error:
        "Use an address without spaces or control characters (up to 2,048 characters).",
    };
  try {
    const explicit = /^[a-z][a-z\d+.-]*:/i.test(raw);
    const url = new URL(explicit ? raw : `https://${raw}`);
    if (url.protocol !== "https:")
      return { error: "Only HTTPS websites are supported." };
    if (url.username || url.password)
      return {
        error: "Addresses containing usernames or passwords are not allowed.",
      };
    const host = url.hostname.toLowerCase();
    if (
      !host.includes(".") ||
      host.endsWith(".") ||
      host.includes(":") ||
      /^[\d.]+$/.test(host) ||
      /\.(local|localhost|internal|lan|home|localdomain)$/.test(host)
    )
      return {
        error:
          "Use a public website hostname, not a local address or IP address.",
      };
    if (url.port && url.port !== "443")
      return { error: "Use standard HTTPS port 443." };
    return { url: url.href };
  } catch {
    return { error: "That address is invalid. Try https://example.com." };
  }
}
export const URL_STORAGE_KEY = "founderlife.workstation.url.v1";
export function loadWebsite() {
  try {
    const value = localStorage.getItem(URL_STORAGE_KEY) ?? "";
    return validateWebsite(value).url ?? "";
  } catch {
    return "";
  }
}
