import { useParams, useNavigate } from "react-router-dom";
import { universDetails } from "@/lib/universData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, ChevronRight, CheckCircle2, ChevronLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const UniversDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const data = slug ? universDetails[slug] : null;

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedIndex(0);
    }, [slug]);

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
            <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.img}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="container mx-auto relative z-10 px-4">
                    <Button
                        variant="ghost"
                        className="text-white mb-8 hover:bg-white/10"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                    <div className="max-w-2xl animate-fade-in-up">
                        <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl text-white/90 font-medium mb-8">
                            {data.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-transform">
                                Explorer
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all">
                                Nous contacter
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details & Subcategories */}
            <section className="py-20 bg-white dark:bg-zinc-950">
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
                                    <Button className="w-full mt-6 rounded-2xl py-5 font-bold flex items-center justify-center space-x-2">
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
                        {data.featuredProducts.map((product) => (
                            <div key={product.id} className="group bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-100 dark:border-zinc-800">
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
                                    <p className="text-muted-foreground mb-6 line-clamp-2">
                                        Qualité exceptionnelle, sélectionnée avec soin pour répondre à vos exigences les plus élevées.
                                    </p>
                                    <Button className="w-full rounded-2xl py-6 font-bold flex items-center justify-center space-x-2">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Commander sur WhatsApp</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 wax-pattern" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                        Prêt à transformer votre quotidien ?
                    </h2>
                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                        Contactez-nous aujourd'hui pour plus d'informations sur nos produits et services.
                    </p>
                    <Button size="lg" variant="secondary" className="rounded-full px-12 py-8 text-xl font-black shadow-2xl hover:scale-105 transition-transform bg-white text-primary border-none">
                        Nous Appeler Maintenant
                    </Button>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default UniversDetail;
