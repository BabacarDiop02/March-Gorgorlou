export const BRAND_CONFIG = {
  name: "Marché Gorgorlou",
  phone: "221776947150",
  formattedPhone: "+221 77 694 71 50",
  whatsappUrl: (text?: string) => {
    const baseUrl = `https://wa.me/221776947150`;
    return text ? `${baseUrl}?text=${encodeURIComponent(text)}` : baseUrl;
  }
};
