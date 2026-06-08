/**
 * Generates property URLs in public/sitemap.xml from the Strapi CMS API.
 * Run automatically before `npm run build`, or manually via `npm run generate-sitemap`.
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://impexcapitalgroup.com";
const API_BASE = "https://api.impexcapitalgroup.com/api/properties";
const SITEMAP_PATH = path.join(__dirname, "..", "public", "sitemap.xml");

const START_MARKER = "  <!-- Property Pages (auto-generated - do not edit manually) -->";
const END_MARKER = "  <!-- END Property Pages (auto-generated) -->";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

async function fetchAllProperties() {
  const allData = [];
  let page = 1;
  let pageCount = 1;

  do {
    const url = new URL(API_BASE);
    url.searchParams.set("pagination[page]", String(page));
    url.searchParams.set("pagination[pageSize]", "100");
    url.searchParams.set("fields[0]", "title");
    url.searchParams.set("fields[1]", "updatedAt");

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API request failed (${res.status}): ${url}`);
    }

    const json = await res.json();
    allData.push(...json.data);
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    page += 1;
  } while (page <= pageCount);

  return allData;
}

function buildPropertyUrlEntries(properties) {
  const seen = new Set();

  return properties
    .map((item) => {
      const slug = createSlug(item.title || "");
      if (!slug || seen.has(slug)) return null;
      seen.add(slug);

      const lastmod = item.updatedAt
        ? `    <lastmod>${item.updatedAt.split("T")[0]}</lastmod>\n`
        : "";

      return (
        `  <url>\n` +
        `    <loc>${SITE_URL}/portfolio/property/${slug}</loc>\n` +
        lastmod +
        `    <changefreq>monthly</changefreq>\n` +
        `    <priority>0.7</priority>\n` +
        `  </url>`
      );
    })
    .filter(Boolean)
    .join("\n\n");
}

function updateSitemap(propertyBlock) {
  let sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");

  const generatedSection = `${START_MARKER}\n${propertyBlock}\n${END_MARKER}`;

  if (sitemap.includes(START_MARKER) && sitemap.includes(END_MARKER)) {
    const pattern = new RegExp(
      `${escapeRegExp(START_MARKER)}[\\s\\S]*?${escapeRegExp(END_MARKER)}`
    );
    sitemap = sitemap.replace(pattern, generatedSection);
  } else {
    sitemap = sitemap.replace(
      "</urlset>",
      `${generatedSection}\n</urlset>`
    );
  }

  fs.writeFileSync(SITEMAP_PATH, sitemap, "utf8");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  console.log("Fetching properties from CMS...");
  const properties = await fetchAllProperties();
  console.log(`Found ${properties.length} properties.`);

  const propertyBlock = buildPropertyUrlEntries(properties);
  updateSitemap(propertyBlock);

  const urlCount = propertyBlock ? propertyBlock.split("<url>").length - 1 : 0;
  console.log(`Updated ${SITEMAP_PATH} with ${urlCount} property URLs.`);
}

main().catch((err) => {
  console.error("Sitemap generation failed:", err.message);
  process.exit(1);
});
