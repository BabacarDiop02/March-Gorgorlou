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
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Supabase Config
const supabaseUrl = process.env.SUPABASE_URL || "https://oamhlhrwmmqtodfumhvb.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "sb_publishable_cIKcdoZCzidBd7UAG0d_9A_3Bzf7Lcy";
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://march-gorgorlou.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, true); // Allow all for now during migration to avoid blocking
    }
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

// Login
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

// Categories (Univers)
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
    console.error("Fetch categories error:", error);
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// Get Universe by Slug (Public)
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
    console.error("Fetch universe error:", error);
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// ... (skipping other post/put/delete for now)

// Safety Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ error: "Database error", details: error instanceof Error ? error.message : String(error) });
  }
});

// Upload to Supabase Storage
app.post("/api/upload", authenticateJWT, upload.single("image"), async (req: any, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

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
});

export default app;
