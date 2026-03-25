import { useParams, useNavigate, Link } from "react-router-dom";
import { universDetails } from "@/lib/universData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, ChevronRight, CheckCircle2, ChevronLeft, ChevronDown, ArrowRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { BRAND_CONFIG } from "@/lib/constants";
import { toast } from "sonner";

const UniversDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const data = slug ? universDetails[slug] : null;

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedIndex(0);
    }, [slug]);

    const openWhatsApp = (msg: string = "") => {
        const text = msg || "Bonjour Gorgorlou, je souhaiterais avoir des informations sur l'univers " + data?.title;
        window.open(BRAND_CONFIG.whatsappUrl(text), "_blank");
    };

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Univers non trouvé</h1>
                <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
            </div>
        );
    }

    const subcategories = data.subcategories;
    const current = subcategories[selectedIndex];
    const total = subcategories.length;

    const goTo = (index: number, dir: "left" | "right") => {
        setSlideDir(dir);
        setTimeout(() => {
            setSelectedIndex(index);
            setSlideDir(null);
        }, 250);
    };

    const handleSelect = (index: number) => {
        if (index === selectedIndex) return;
        goTo(index, index > selectedIndex ? "right" : "left");
    };

    const prev = () => goTo((selectedIndex - 1 + total) % total, "left");
    const next = () => goTo((selectedIndex + 1) % total, "right");

    return (
        <div className="min-h-screen bg-background font-body">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[600px] lg:min-h-[80vh] flex items-center overflow-hidden py-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.img}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                </div>

                <div className="container mx-auto relative z-10 px-4 pt-24 pb-12">
                    <div className="max-w-3xl animate-fade-in-up">
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1] drop-shadow-xl">
                            {data.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-xl leading-relaxed drop-shadow-lg">
                            {data.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button 
                                onClick={() => document.getElementById("details-section")?.scrollIntoView({ behavior: "smooth" })}
                                className="btn-gorgorlou text-xl flex items-center justify-center gap-3"
                            >
                                <span>🚀</span> Explorer l'univers
                            </button>
                            <button 
                                onClick={() => openWhatsApp()}
                                className="btn-whatsapp text-xl flex items-center justify-center gap-3"
                            >
                                <MessageCircle size={22} />
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details & Subcategories */}
            <section id="details-section" className="py-20 bg-white dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-sm font-bold tracking-wider uppercase">Qualité Supérieure</span>
                            </div>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
                                Pourquoi choisir notre univers <span className="text-primary">{data.title.split(' ')[0]}</span> ?
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {data.description}
                            </p>

                            {/* Subcategory list */}
                            <div className="space-y-3">
                                {subcategories.map((sub, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(index)}
                                        className={`flex items-center p-4 rounded-2xl transition-all duration-300 cursor-pointer group border-2 ${selectedIndex === index
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "bg-zinc-50 dark:bg-zinc-900 border-transparent hover:border-primary/30 hover:shadow-md"
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 transition-all ${selectedIndex === index
                                                ? "bg-white/20 text-white"
                                                : "bg-primary/20 text-primary group-hover:scale-110"
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <span className="font-semibold text-lg flex-1">{sub.name}</span>
                                        {selectedIndex === index ? (
                                            <ChevronDown className="h-5 w-5 text-white/80" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slideshow Panel */}
                        <div className="sticky top-8">
                            <div className="rounded-3xl overflow-hidden shadow-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                {/* Image */}
                                <div className="relative h-72 lg:h-80 overflow-hidden">
                                    <img
                                        key={selectedIndex}
                                        src={current.image}
                                        alt={current.name}
                                        className={`w-full h-full object-cover transition-all duration-300 ${slideDir === "right"
                                                ? "translate-x-8 opacity-0"
                                                : slideDir === "left"
                                                    ? "-translate-x-8 opacity-0"
                                                    : "translate-x-0 opacity-100"
                                            }`}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Badge catégorie */}
                                    <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                        {selectedIndex + 1} / {total}
                                    </div>

                                    {/* Navigation arrows */}
                                    {total > 1 && (
                                        <>
                                            <button
                                                onClick={prev}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2.5 transition-all hover:scale-110 shadow"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={next}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2.5 transition-all hover:scale-110 shadow"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}

                                    {/* Title on image */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-heading text-2xl font-bold drop-shadow-lg">
                                            {current.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="p-6">
                                    <p className="text-muted-foreground leading-relaxed text-base">
                                        {current.description}
                                    </p>

                                    {/* Dots navigation */}
                                    {total > 1 && (
                                        <div className="flex justify-center gap-2 mt-6">
                                            {subcategories.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSelect(i)}
                                                    className={`rounded-full transition-all duration-300 ${i === selectedIndex
                                                            ? "w-6 h-2.5 bg-primary"
                                                            : "w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-primary/50"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <Button 
                                        onClick={() => openWhatsApp("Bonjour, je suis intéressé par : " + current.name + " (" + data.title + ")")}
                                        className="w-full mt-6 rounded-2xl py-5 font-bold flex items-center justify-center space-x-2"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Commander sur WhatsApp</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-4xl font-bold mb-4">Produits Vedettes</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.featuredProducts.map((product, index) => (
                            <div key={product.id} className={`group bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-sm hover-card-premium animate-fade-in-up stagger-${(index % 3) + 1} border border-zinc-100 dark:border-zinc-800`}>
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                        <span className="font-bold text-primary">{product.price}</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                                        L'excellence du terroir sénégalais, sélectionnée avec une passion infinie pour votre plus grand plaisir.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button 
                                            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                                            className="btn-gorgorlou w-full flex items-center justify-center gap-2 py-4"
                                        >
                                            <ShoppingCart size={20} />
                                            Ajouter au panier
                                        </button>
                                        <button 
                                            onClick={() => openWhatsApp("Je souhaite commander en direct : " + product.name + " (" + product.price + ")")}
                                            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-muted-foreground hover:text-primary transition-colors border border-primary/10 rounded-xl hover:bg-primary/5"
                                        >
                                            <MessageCircle size={18} />
                                            Commander via WhatsApp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Universes */}
            <section className="py-24 bg-white dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-xl">
                            <h2 className="font-heading text-4xl font-black mb-4 tracking-tight">
                                Continuez votre exploration
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Nos autres univers thématiques vous attendent pour sublimer votre quotidien.
                            </p>
                        </div>
                        <Link 
                            to="/" 
                            className="font-heading font-bold text-primary hover:underline flex items-center gap-2 text-lg"
                        >
                            Voir tout le marché <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Object.entries(universDetails)
                            .filter(([key]) => key !== slug)
                            .slice(0, 3)
                            .map(([key, item]) => (
                                <Link
                                    key={key}
                                    to={`/univers/${key}`}
                                    className="group relative h-80 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/70 text-sm line-clamp-1 group-hover:text-white transition-colors">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 wax-pattern" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-8 drop-shadow-lg">
                        Prêt à transformer votre quotidien ?
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                        L'excellence est à un clic. Rejoignez la communauté Gorgorlou et savourez l'authenticité.
                    </p>
                    <button 
                        onClick={() => openWhatsApp()}
                        className="bg-white text-primary font-heading font-black px-12 py-6 rounded-2xl text-xl shadow-2xl hover:scale-105 transition-all hover:bg-zinc-100 flex items-center gap-3 mx-auto"
                    >
                        <MessageCircle size={24} />
                        Passer commande sur WhatsApp
                    </button>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default UniversDetail;
