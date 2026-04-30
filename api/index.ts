import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";

dotenv.config();

const app = express();

// --- Prisma Singleton for Serverless ---
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// --- Supabase Config ---
const supabaseUrl = process.env.SUPABASE_URL || "https://oamhlhrwmmqtodfumhvb.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "sb_publishable_cIKcdoZCzidBd7UAG0d_9A_3Bzf7Lcy";
const supabase = createClient(supabaseUrl, supabaseKey);

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://march-gorgorlou.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    // En production sur Vercel, on peut être plus restrictif, mais pour l'instant on autorise tout pour éviter les blocages durant la migration
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());

// --- Multer Utils (Memory storage for Serverless) ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Auth Middleware ---
const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// --- Routes ---

app.get("/", (req, res) => {
  res.send("Gorgorlou API on Vercel is running... 🚀");
});

// Auth: Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "24h",
      });
      res.json({ token, user: { id: user.id, username: user.username } });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// Users management
app.get("/api/users", authenticateJWT, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/users", authenticateJWT, async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// --- Categories (Univers) ---
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true,
        items: true
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.get("/api/universes/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        subCategories: true,
        items: true
      }
    });
    if (!category) return res.status(404).json({ message: "Universe not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.post("/api/categories", authenticateJWT, async (req, res) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.put("/api/categories/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.delete("/api/categories/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id: parseInt(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// --- SubCategories & Items Management ---

app.get("/api/subcategories", async (req, res) => {
  try {
    const subs = await prisma.subCategory.findMany({ include: { category: true } });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/subcategories", authenticateJWT, async (req, res) => {
  try {
    const sub = await prisma.subCategory.create({ data: req.body });
    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.put("/api/subcategories/:id", authenticateJWT, async (req, res) => {
  try {
    const sub = await prisma.subCategory.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/subcategories/:id", authenticateJWT, async (req, res) => {
  try {
    await prisma.subCategory.delete({ where: { id: parseInt(req.params.id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.get("/api/universe-items", async (req, res) => {
  try {
    const items = await prisma.universeItem.findMany({ include: { category: true } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/universe-items", authenticateJWT, async (req, res) => {
  try {
    const item = await prisma.universeItem.create({ data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.put("/api/universe-items/:id", authenticateJWT, async (req, res) => {
  try {
    const item = await prisma.universeItem.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/universe-items/:id", authenticateJWT, async (req, res) => {
  try {
    await prisma.universeItem.delete({ where: { id: parseInt(req.params.id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// --- Orders (Commandes) ---

app.get("/api/orders", authenticateJWT, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.post("/api/orders", async (req, res) => {
  const { items, ...orderData } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        ...orderData,
        totalPrice: parseFloat(orderData.totalPrice),
        items: {
          create: items
        }
      },
      include: { items: true }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.put("/api/orders/:id", authenticateJWT, async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.delete("/api/orders/:id", authenticateJWT, async (req, res) => {
  try {
    await prisma.order.delete({ where: { id: parseInt(req.params.id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// --- Products (Safety) ---

app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.post("/api/products", authenticateJWT, async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.put("/api/products/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.delete("/api/products/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// --- Testimonials ---

app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.post("/api/testimonials", authenticateJWT, async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.create({ data: req.body });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.put("/api/testimonials/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

app.delete("/api/testimonials/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// --- Upload to Supabase Storage ---

app.post("/api/upload", authenticateJWT, upload.single("image"), async (req: any, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const file = req.file;
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ error: error.message });
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    res.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    res.status(500).json({ error: "Upload error", details: error instanceof Error ? error.message : String(error) });
  }
});

export default app;
