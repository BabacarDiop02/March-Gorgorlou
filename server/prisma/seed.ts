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

  // Add initial categories from BentoGrid
  const categories = [
    {
      title: "Mobilier Noble",
      subtitle: "L'excellence du bois massif pour votre héritage.",
      badge: "Prestige",
      img: "/uploads/cat-maison.jpg",
      gridArea: "maison",
    },
    {
      title: "Art de la Fête",
      subtitle: "Réceptions d'exception & Art de la table.",
      badge: "Exclusif",
      img: "/uploads/cat-fetes.jpg",
      gridArea: "fetes",
    },
    {
      title: "Ferme Authentique",
      subtitle: "Volailles élevées en plein air & œufs frais.",
      badge: "Terroir",
      img: "/uploads/cat-volaille.jpg",
      gridArea: "volaille",
    },
    {
      title: "Fraîcheur du Jour",
      subtitle: "Le meilleur de l'océan & du potager.",
      badge: "Arrivage",
      img: "/uploads/cat-marche.jpg",
      gridArea: "marche",
    },
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
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

  // Add initial testimonials from Testimonials.tsx
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
