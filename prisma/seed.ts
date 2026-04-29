import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log({ admin });

  // Add initial categories (Universes) with detailed data
  const categoriesData = [
    {
      slug: "maison",
      title: "Art de Vivre & Mobilier Noble",
      subtitle: "Le bois massif, l'âme de votre foyer pour l'éternité.",
      description: "Plongez dans l'univers de l'ébénisterie d'exception. Nos créations en bois massif ne sont pas de simples meubles, mais des héritages façonnés par les mains expertes d'artisans locaux. De l'ébène profond au teck chaleureux, chaque essence est choisie pour sa noblesse et sa capacité à raconter une histoire unique dans votre intérieur.",
      badge: "Prestige",
      img: "/uploads/cat-maison.jpg",
      gridArea: "maison",
      subCategories: [
        { name: "Salons d'Apparat", description: "L'élégance du bois sculpté rencontre le confort moderne.", image: "/uploads/salon.jpeg" },
        { name: "Suites Parentales", description: "Créez un sanctuaire de sérénité avec nos lits et commodes.", image: "/uploads/une_chamb.jpeg" },
        { name: "Espaces Bureau Prestige", description: "Stimulez votre créativité dans un environnement raffiné.", image: "/uploads/bureau.jpeg" },
        { name: "Curiosités & Déco", description: "Le détail qui change tout : miroirs artisanaux, luminaires design.", image: "/uploads/deco.jpeg" },
      ],
      items: [
        { name: "Lit Royal en Teck Massif", price: "285.000 FCFA", image: "/uploads/cat-maison.jpg" },
        { name: "Table Basse 'Gorgorlou' Sculptée", price: "85.000 FCFA", image: "/uploads/salon.jpeg" },
        { name: "Buffet Vintage en Acajou", price: "195.000 FCFA", image: "/uploads/cat-maison.jpg" },
        { name: "Fauteuil Club Cuir & Bois", price: "120.000 FCFA", image: "/uploads/salon.jpeg" },
        { name: "Console d'Entrée 'Baol'", price: "65.000 FCFA", image: "/uploads/deco.jpeg" },
        { name: "Armoire Prestige 4 Portes", price: "450.000 FCFA", image: "/uploads/une_chamb.jpeg" },
      ]
    },
    {
      slug: "fetes",
      title: "Cérémonies & Réceptions d'Excellence",
      subtitle: "Sublimez vos baptêmes, mariages et moments d'exception.",
      description: "Parce que chaque célébration est unique, nous avons réuni le meilleur de l'art de la table. De l'élégance intemporelle de la porcelaine à l'aspect pratique de nos gammes jetables premium, offrez à vos invités une expérience gravée dans les mémoires.",
      badge: "Exclusif",
      img: "/uploads/cat-fetes.jpg",
      gridArea: "fetes",
      subCategories: [
        { name: "Arts de la Table", description: "Services en porcelaine fine, couverts dorés et verrerie de prestige.", image: "/uploads/cat-fetes.jpg" },
        { name: "Cristallerie & Éclat", description: "Une sélection de verres à vin, flûtes et carafes en cristal soufflé.", image: "/uploads/cat-fetes.jpg" },
        { name: "Linges de Table", description: "Nappes brodées à la main, chemins de table en soie.", image: "/uploads/cat-fetes.jpg" },
        { name: "Scénographie de Fête", description: "Transformez vos lieux de réception.", image: "/uploads/cat-fetes.jpg" },
      ],
      items: [
        { name: "Service de Table Luxe (24 pers)", price: "45.000 FCFA", image: "/uploads/cat-fetes.jpg" },
        { name: "Pack Réception Jetable Chic", price: "7.500 FCFA", image: "/uploads/cat-fetes.jpg" },
        { name: "Nappe Broderie Saint-Louis", price: "25.000 FCFA", image: "/uploads/cat-fetes.jpg" },
        { name: "Flûtes à Cristal (Set de 6)", price: "18.000 FCFA", image: "/uploads/cat-fetes.jpg" },
        { name: "Chandelier Doré 5 Branches", price: "15.000 FCFA", image: "/uploads/cat-fetes.jpg" },
        { name: "Fontaine à Jus en Cristal", price: "22.500 FCFA", image: "/uploads/cat-fetes.jpg" },
      ]
    },
    {
      slug: "volaille",
      title: "La Ferme aux Mille Saveurs",
      subtitle: "La fraîcheur absolue, de nos pâturages à votre assiette.",
      description: "Redécouvrez le goût vrai du terroir. Nos volailles sont élevées en plein air avec une alimentation 100% naturelle dans les fermes les plus réputées du pays. Chaque produit est sélectionné pour son fondant et sa saveur incomparable.",
      badge: "Terroir",
      img: "/uploads/cat-volaille.jpg",
      gridArea: "volaille",
      subCategories: [
        { name: "Volailles Fermières", description: "Poulets de chair, poulets bicyclettes et poules pondeuses.", image: "/uploads/cat-volaille.jpg" },
        { name: "Découpes & Marinades", description: "Gagnez du temps avec nos filets de poulet déjà marinés.", image: "/uploads/cat-volaille.jpg" },
        { name: "L'Atelier des Œufs", description: "Des œufs extra-frais ramassés à l'aube.", image: "/uploads/cat-volaille.jpg" },
        { name: "Spécialités de Fête", description: "Dindes, pintades et pièces de choix pour vos grands événements.", image: "/uploads/cat-volaille.jpg" },
      ],
      items: [
        { name: "Poulet Fermier Label Rouge", price: "4.200 FCFA", image: "/uploads/cat-volaille.jpg" },
        { name: "Plateau d'Œufs Frais (x30)", price: "3.200 FCFA", image: "/uploads/cat-volaille.jpg" },
        { name: "Filets Marines au Piment Vert", price: "3.500 FCFA", image: "/uploads/cat-volaille.jpg" },
        { name: "Dinde Entière (Sur Commande)", price: "22.000 FCFA", image: "/uploads/cat-volaille.jpg" },
        { name: "Pintade de Casamance", price: "6.500 FCFA", image: "/uploads/cat-volaille.jpg" },
        { name: "Cuisse de Poulet (le kg)", price: "3.800 FCFA", image: "/uploads/cat-volaille.jpg" },
      ]
    },
    {
      slug: "marche",
      title: "Le Grand Marché Fraîcheur",
      subtitle: "Le meilleur de l'océan et des terres fertiles du Sénégal.",
      description: "Le cœur battant du Sénégal s'invite chez vous. Nous sélectionnons chaque jour le meilleur des débarcadères de Soumbédioune et des potagers des Niayes.",
      badge: "Arrivage",
      img: "/uploads/cat-marche.jpg",
      gridArea: "marche",
      subCategories: [
        { name: "Trésors de l'Atlantique", description: "Thiof, Capitaine, Dorade royale...", image: "/uploads/cat-marche.jpg" },
        { name: "Crustacés d'Exception", description: "Crevettes Gambas royales, langoustes et homards.", image: "/uploads/cat-marche.jpg" },
        { name: "Potager des Niayes", description: "Légumes croquants cueillis à maturité.", image: "/uploads/cat-marche.jpg" },
        { name: "Verger Tropical", description: "Mangues charnues, papayes sucrées et pastèques désaltérantes.", image: "/uploads/cat-marche.jpg" },
      ],
      items: [
        { name: "Thiof de Ligne (le kg)", price: "5.500 FCFA", image: "/uploads/cat-marche.jpg" },
        { name: "Panier Maraîcher Bio (7kg)", price: "6.500 FCFA", image: "/uploads/cat-marche.jpg" },
        { name: "Gambas XXL Fraîches", price: "12.500 FCFA", image: "/uploads/cat-marche.jpg" },
        { name: "Lot de Mangues Kent (x5)", price: "3.000 FCFA", image: "/uploads/cat-marche.jpg" },
        { name: "Dorade Royale (le kg)", price: "4.800 FCFA", image: "/uploads/cat-marche.jpg" },
        { name: "Sac d'Oignon local (25kg)", price: "14.500 FCFA", image: "/uploads/cat-marche.jpg" },
      ]
    },
  ];

  for (const catData of categoriesData) {
    const { subCategories, items, ...cat } = catData;
    const category = await prisma.category.create({
      data: {
        ...cat,
        subCategories: { create: subCategories },
        items: { create: items },
      },
    });
    console.log(`Created category: ${category.title}`);
  }

  // Add initial products from SafetySection
  const products = [
    {
      img: "/uploads/safety-helmet.jpg",
      title: "Protection Cranienne & Visibilité",
      tagline: "Casques haute résistance et gilets réfléchissants normés pour une sécurité maximale sur zone.",
      action: "Explorer la gamme",
    },
    {
      img: "/uploads/safety-boots.jpg",
      title: "Chaussures de Sécurité S3",
      tagline: "Coques en acier, semelles anti-perforation et confort ergonomique pour les longues journées.",
      action: "Trouver ma pointure",
    },
    {
      img: "/uploads/safety-gloves.jpg",
      title: "Équipements de Protection Individuelle (EPI)",
      tagline: "Gants anti-coupure, lunettes de protection et masques. L'essentiel pour chaque corps de métier.",
      action: "Voir tout l'outillage",
    },
  ];

  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  // Add initial testimonials
  const testimonials = [
    {
      name: "Fatou Diop",
      quartier: "Mermoz",
      text: "Trouver des meubles de qualité et de la volaille fraîche au même endroit est une petite révolution. J'ai commandé mon salon et mes œufs la même semaine, tout était parfait !",
      avatar: "👩🏾",
    },
    {
      name: "Ibrahima Ndiaye",
      quartier: "Parcelles Assainies",
      text: "En tant qu'entrepreneur, la livraison 'Gaw' est un atout précieux. Mon lit et mes bureaux sont arrivés en quelques heures. Un service d'une efficacité rare à Dakar.",
      avatar: "👨🏾",
    },
    {
      name: "Aminata Fall",
      quartier: "Almadies",
      text: "La finesse du bois massif m'a impressionnée. Gorgorlou propose un rapport qualité-prix imbattable. Je ne fais plus mon marché ailleurs pour mes grandes réceptions.",
      avatar: "👩🏾‍🦱",
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
