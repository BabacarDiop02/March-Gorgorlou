import { useState } from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, CreditCard, ShieldCheck, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useCart } from "@/hooks/useCart";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = (details: any) => {
    const doc = new jsPDF();
    const { items, total, customer } = details;
    const primaryColor = [249, 115, 22]; // #f97316
    const secondaryColor = [39, 39, 42]; // #27272a
    
    // Aesthetic Header Background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 50, "F");
    
    // Brand Logo/Name
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("MARCHÉ GORGORLOU", 105, 25, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("L'EXCELLENCE DU TERROIR AU SÉNÉGAL", 105, 35, { align: "center" });

    // Invoice Meta
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURE", 20, 68);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(`Identifiant: #GK-${Date.now().toString().slice(-6)}`, 20, 75);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 80);

    // Customer Info Box
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(120, 58, 75, 40, 4, 4, "F");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("LIVRER À", 127, 68);
    
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(10);
    doc.text(`${customer.firstName} ${customer.lastName}`, 127, 76);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Tel: +221 ${customer.phone}`, 127, 82);
    doc.text(customer.address.substring(0, 38), 127, 88);

    // Table Header
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(20, 108, 170, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("ARTICLE", 42, 115.5);
    doc.text("QTE", 125, 115.5, { align: "center" });
    doc.text("UNITÉ", 152, 115.5, { align: "center" });
    doc.text("TOTAL", 185, 115.5, { align: "right" });

    // Table Content
    let y = 130;
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    
    items.forEach((item: any, i: number) => {
        if (i % 2 === 0) {
            doc.setFillColor(252, 252, 252);
            doc.rect(20, y - 7, 170, 12, "F");
        }
        
        // Product Aesthetic Placeholder
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(24, y - 5, 10, 8, 1, 1, "F");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(5);
        doc.text("PRODUCT", 25, y);
        
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(item.name.substring(0, 40), 42, y);
        
        doc.setFont("helvetica", "normal");
        doc.text(`${item.quantity}`, 125, y, { align: "center" });
        doc.text(`${item.price.replace(/\s/g, ' ')}`, 152, y, { align: "center" });
        
        const priceNum = parseInt(item.price.replace(/\D/g, ''));
        const subtotal = priceNum * item.quantity;
        doc.setFont("helvetica", "bold");
        doc.text(`${subtotal.toLocaleString().replace(/\s/g, ' ')} FCFA`, 185, y, { align: "right" });
        
        y += 12;
        
        if (y > 240) {
            doc.addPage();
            y = 30;
        }
    });

    // Elegant TOTAL Section
    y += 10;
    doc.setFillColor(250, 250, 250);
    doc.rect(120, y, 75, 25, "F");
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.line(195, y, 195, y + 25);
    
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("MONTANT TOTAL", 127, y + 10);
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(18);
    const cleanTotal = total.replace(/\s/g, ' ');
    doc.text(cleanTotal, 190, y + 18, { align: "right" });

    // Custom Signature/Stamp Area
    y += 40;
    doc.setDrawColor(240, 240, 240);
    doc.rect(130, y, 60, 25);
    doc.setFontSize(7);
    doc.setTextColor(200, 200, 200);
    doc.text("Cachet du Marché", 160, y + 13, { align: "center" });
    doc.text("Signature Autorisée", 160, y + 18, { align: "center" });

    // Note Section
    if (customer.notes) {
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("REMARQUES LIVRAISON", 20, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(110, 110, 110);
        const splitNotes = doc.splitTextToSize(customer.notes, 100);
        doc.text(splitNotes, 20, y + 7);
    }

    // High-End Footer Banner
    const footerY = 280;
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, footerY - 5, 210, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("MERCI DE VOTRE CONFIANCE !", 105, footerY + 5, { align: "center" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Marche Gorgorlou | Dakar, Sénégal | www.gorgorlou.sn", 105, footerY + 12, { align: "center" });

    doc.save(`Facture_Gorgorlou_#GK-${Date.now().toString().slice(-6)}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store details for PDF
    const orderDetails = {
        items: cart,
        total: `${totalPrice.toLocaleString()} FCFA`,
        customer: formData
    };
    setLastOrderDetails(orderDetails);

    // Construct WhatsApp message
    const merchantPhone = BRAND_CONFIG.phone;
    const itemsList = cart.map(item => `   ▫️ *${item.name}*\n       └─ Qte: ${item.quantity} | ${item.price}`).join("\n\n");
    const divider = "──────────────────";
    
    const message = `🌟 *NOUVELLE COMMANDE GORGORLOU* 🌟\n\n` +
      `📌 *DÉTAILS DU CLIENT*\n` +
      `👤 *Nom :* ${formData.firstName} ${formData.lastName}\n` +
      `📞 *Tel :* ${formData.phone}\n` +
      `📍 *Adresse :* ${formData.address}\n` +
      `${divider}\n\n` +
      `📦 *ARTICLES COMMANDÉS :*\n\n${itemsList}\n\n` +
      `${divider}\n` +
      `🎯 *TOTAL NET À PAYER :* ${orderDetails.total}\n` +
      `${divider}\n\n` +
      (formData.notes ? `📝 *Note client :* _${formData.notes}_\n\n` : "") +
      `⚡ _Commande validée via Marche Gorgorlou_`;

    const whatsappUrl = `https://wa.me/${merchantPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    setIsOrdered(true);
    setTimeout(() => {
        clearCart();
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-body flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 animate-fade-in-up">
          <div className="w-24 h-24 bg-green-50 dark:bg-green-900/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
          <h1 className="font-heading text-4xl font-black mb-4 tracking-tight">C'est envoyé !</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium">
            Votre commande a été transmise avec succès sur WhatsApp.
          </p>
          
          <div className="space-y-4 mb-8">
            <Button 
                variant="outline"
                onClick={() => generatePDF(lastOrderDetails)}
                className="w-full rounded-2xl py-6 border-2 border-zinc-100 hover:border-primary/30 transition-all font-bold group"
            >
                <Download className="mr-2 group-hover:animate-bounce" size={20} />
                Télécharger la Facture PDF
            </Button>
            <Button 
                onClick={() => navigate("/")}
                className="w-full rounded-2xl py-6 text-xl font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all"
            >
                Retourner au marché
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground italic flex items-center justify-center gap-2">
            <ExternalLink size={14} />
            Conservez votre facture pour la livraison.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-body">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter mb-4">
                <Truck size={14} />
                Livraison à Domicile
              </div>
              <h1 className="font-heading text-4xl font-black tracking-tight mb-2">Finalisation</h1>
              <p className="text-muted-foreground font-medium">Saisissez vos coordonnées pour recevoir vos produits.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Prénom</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-semibold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Nom Complet</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-semibold" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Téléphone Principal (WhatsApp)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-muted-foreground border-r border-zinc-200 dark:border-zinc-800 pr-4">+221</span>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="77 000 00 00" className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl pl-24 pr-6 py-4 outline-none focus:border-primary transition-all font-semibold" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Adresse de livraison</label>
                <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Quartier, Rue, N° de porte..." className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all font-semibold" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Instructions pour le livreur (facultatif)</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} placeholder="Précisions sur l'accès, horaires..." className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all resize-none font-semibold"></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full rounded-2xl py-8 text-xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                  Confirmer ma commande
                </Button>
                <p className="text-center mt-6 text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" />
                  Vos données sont protégées et non partagées.
                </p>
              </div>
            </form>
          </div>

          {/* Side Info */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                <h2 className="font-heading text-2xl font-black mb-8 pb-4 border-b border-zinc-50 dark:border-zinc-800 tracking-tight">Résumé du Total</h2>
                
                <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 mb-8 border border-primary/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Montant net à payer</p>
                    <p className="text-5xl font-heading font-black text-primary tracking-tighter mb-4">
                        {totalPrice.toLocaleString()} <span className="text-xl">FCFA</span>
                    </p>
                    <div className="flex items-center gap-4 saturate-0 opacity-40 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700">
                      <img src="/images/logos/Orange_Money.svg" alt="OM" className="h-4" />
                      <img src="/images/logos/Wave.png" alt="Wave" className="h-3.5" />
                      <img src="/images/logos/Visa_Inc.svg" alt="Visa" className="h-2.5" />
                      <img src="/images/logos/Mastercard.svg" alt="MC" className="h-4" />
                    </div>
                </div>
                
                <div className="space-y-4 mb-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Paiement Wave / OM / Cash</p>
                      <p className="text-xs text-muted-foreground">Payez à la livraison ou par mobile money (Wave/OM).</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <Truck size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Livraison Prioritaire</p>
                      <p className="text-xs text-muted-foreground">Sous 24h à Dakar, 48h ailleurs.</p>
                    </div>
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-4 font-black">24h</div>
                    <p className="text-xs font-bold text-muted-foreground leading-tight">Délai de livraison moyen</p>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-4 shadow"><CheckCircle2 size={24} /></div>
                    <p className="text-xs font-bold text-muted-foreground leading-tight">Qualité vérifiée avant envoi</p>
                </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
