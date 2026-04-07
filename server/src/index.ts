import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://march-gorgorlou.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --- Multer Utils ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
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

// --- Routes ---

// Root
app.get("/", (req, res) => {
  res.send("Gorgorlou API Server is running... 🚀");
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token, user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Categories (Univers)
app.get("/api/categories", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      subCategories: true,
      items: true
    }
  });
  res.json(categories);
});

// Get Universe by Slug (Public)
app.get("/api/universes/:slug", async (req, res) => {
  const { slug } = req.params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      subCategories: true,
      items: true
    }
  });

  if (!category) return res.status(404).json({ message: "Universe not found" });
  res.json(category);
});

app.post("/api/categories", authenticateJWT, async (req, res) => {
  const category = await prisma.category.create({ data: req.body });
  res.json(category);
});

app.put("/api/categories/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: req.body,
  });
  res.json(category);
});

app.delete("/api/categories/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  await prisma.category.delete({ where: { id: parseInt(id) } });
  res.sendStatus(204);
});

// --- SubCategories & Items Management ---

app.post("/api/subcategories", authenticateJWT, async (req, res) => {
  const sub = await prisma.subCategory.create({ data: req.body });
  res.json(sub);
});

app.delete("/api/subcategories/:id", authenticateJWT, async (req, res) => {
  await prisma.subCategory.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

app.post("/api/universe-items", authenticateJWT, async (req, res) => {
  const item = await prisma.universeItem.create({ data: req.body });
  res.json(item);
});

app.delete("/api/universe-items/:id", authenticateJWT, async (req, res) => {
  await prisma.universeItem.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

// --- Orders (Commandes) ---

app.get("/api/orders", authenticateJWT, async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(orders);
});

app.post("/api/orders", async (req, res) => {
  const { items, ...orderData } = req.body;
  // items should be an array of { productName, quantity, price }
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
});

app.put("/api/orders/:id", authenticateJWT, async (req, res) => {
  const order = await prisma.order.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  });
  res.json(order);
});

app.delete("/api/orders/:id", authenticateJWT, async (req, res) => {
  await prisma.order.delete({ where: { id: parseInt(req.params.id) } });
  res.sendStatus(204);
});

// Products (Safety)
app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/api/products", authenticateJWT, async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.json(product);
});

app.put("/api/products/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: req.body,
  });
  res.json(product);
});

app.delete("/api/products/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id: parseInt(id) } });
  res.sendStatus(204);
});

// Testimonials
app.get("/api/testimonials", async (req, res) => {
  const testimonials = await prisma.testimonial.findMany();
  res.json(testimonials);
});

app.post("/api/testimonials", authenticateJWT, async (req, res) => {
  const testimonial = await prisma.testimonial.create({ data: req.body });
  res.json(testimonial);
});

app.put("/api/testimonials/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const testimonial = await prisma.testimonial.update({
    where: { id: parseInt(id) },
    data: req.body,
  });
  res.json(testimonial);
});

app.delete("/api/testimonials/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  await prisma.testimonial.delete({ where: { id: parseInt(id) } });
  res.sendStatus(204);
});

// Upload
app.post("/api/upload", authenticateJWT, upload.single("image"), (req, res) => {
  if (req.file) {
    res.json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).send("No file uploaded");
  }
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
