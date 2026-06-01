/**
 * generate-products.mjs
 *
 * Walks your products directory and generates src/data/products-generated.ts
 *
 * Folder structure expected:
 *   public/products/
 *   └── BrandName/
 *       └── 3110 - 26 26 28 28 30 32 - 2 seri - 50 lei/
 *           ├── 1.jpg
 *           └── 2.jpg
 *
 * Run:
 *   node generate-products.mjs
 */

import fs from "fs";
import path from "path";

// Config
const PRODUCTS_DIR = "./public/products";
const OUTPUT_FILE = "./src/data/products.ts";
const IMAGE_PUBLIC_PREFIX = "/products";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function parseFolder(folderName) {
  // Format: {code} - {sizes} - {irrelevant} - {price lei}
  // e.g.  : 3110 - 26 26 28 28 30 32 - 2 seri - 50 lei
  const parts = folderName.split(/\s+-\s+/);

  if (parts.length !== 4) {
    return null;
  }

  const [rawId, rawSizes, , rawPrice] = parts;

  const id = rawId.trim();
  const unitPrice = parseInt(rawPrice.trim().replace(/\s*lei$/i, ""), 10);

  const sizeList = rawSizes.trim().split(/\s+/).map(Number);
  const units = sizeList.length;
  const minSize = Math.min(...sizeList);
  const maxSize = Math.max(...sizeList);
  const sizes =
    minSize === maxSize ? String(minSize) : minSize + " - " + maxSize;

  if (!id || isNaN(unitPrice) || sizeList.some(isNaN)) {
    return null;
  }

  return { id, sizes, units, unitPrice };
}

function getImages(folderPath, brand, folderName) {
  return fs
    .readdirSync(folderPath)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => IMAGE_PUBLIC_PREFIX + "/" + brand + "/" + folderName + "/" + f);
}

// Main
const products = [];

const brands = fs
  .readdirSync(PRODUCTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const brand of brands) {
  const brandPath = path.join(PRODUCTS_DIR, brand);
  const folders = fs
    .readdirSync(brandPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const folderName of folders) {
    const parsed = parseFolder(folderName);
    if (!parsed) {
      console.warn("  skipping: " + brand + "/" + folderName);
      continue;
    }

    const folderPath = path.join(brandPath, folderName);
    const images = getImages(folderPath, brand, folderName);
    const image = images[0] ?? "";
    const extraImages = images.slice(1);

    products.push({ ...parsed, brand, image, extraImages, keywords: [] });

    console.log(
      "  ok " +
        brand +
        " / " +
        parsed.id +
        " -> " +
        parsed.units +
        " buc, " +
        images.length +
        " img",
    );
  }
}

// Emit TypeScript
const allBrands = [...new Set(products.map((p) => p.brand))].sort();

const lines = [
  "// AUTO-GENERATED — do not edit by hand.",
  "// Run: node generate-products.mjs",
  "",
  "export interface Product {",
  "  id: string;",
  "  brand: string;",
  "  sizes: string;",
  "  units: number;",
  "  unitPrice: number;",
  "  image: string;",
  "  extraImages: string[];",
  "  keywords: string[];",
  "}",
  "",
  "export const products: Product[] = " +
    JSON.stringify(products, null, 2) +
    ";",
  "",
  "export const ALL_KEYWORDS: string[] = " +
    JSON.stringify(allBrands, null, 2) +
    ";",
  "",
  'export type SortKey = "code-asc" | "code-desc" | "price-asc" | "price-desc";',
  "",
  "export function sortProducts(list: Product[], key: SortKey): Product[] {",
  "  return [...list].sort((a, b) => {",
  "    switch (key) {",
  '      case "code-asc":  return a.id.localeCompare(b.id);',
  '      case "code-desc": return b.id.localeCompare(a.id);',
  '      case "price-asc": return a.unitPrice - b.unitPrice;',
  '      case "price-desc": return b.unitPrice - a.unitPrice;',
  "    }",
  "  });",
  "}",
];

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");

console.log("\nGenerated " + products.length + " products -> " + OUTPUT_FILE);
