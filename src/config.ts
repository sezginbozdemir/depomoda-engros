export const CONFIG = {
  /** WhatsApp number in international format WITHOUT + or spaces, e.g. "40712345678" */
  whatsappNumber: "40740181735",
  storeName: "DEPOMODA ENGROS",
  tagline: "STOC LICHIDARE",
  initialLoad: 15,
  loadMoreCount: 10,
} as const;

export function buildWhatsAppLink(productId: string): string {
  const msg = encodeURIComponent(
    `Bună ziua! Sunt interesat de Cod: ${productId}. Vă rog să-mi confirmați disponibilitatea și detaliile de livrare.`,
  );
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
}

export function buildWhatsAppGeneralLink(): string {
  const msg = encodeURIComponent(
    "Bună ziua! Sunt interesat de produsele voastre en-gros.",
  );
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
}
