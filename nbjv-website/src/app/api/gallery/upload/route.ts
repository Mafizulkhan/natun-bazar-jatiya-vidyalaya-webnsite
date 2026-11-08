import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GalleryImage, GALLERY_IMAGES } from "@/lib/data";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const DATA_FILE_PATH = path.join(process.cwd(), "public", "data", "gallery.json");

function getGalleryData(): GalleryImage[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading gallery data:", err);
  }
  return GALLERY_IMAGES;
}

function saveGalleryData(images: GalleryImage[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(images, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing gallery data:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const captions = formData.getAll("caption") as string[];
    const categories = formData.getAll("category") as string[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 });
    }

    const currentImages = getGalleryData();
    const newItems: GalleryImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || typeof file.arrayBuffer !== "function") continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || ".jpg";
      const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const filename = `photo-${Date.now()}-${i}-${baseName}${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      const caption = captions[i] || file.name.replace(/\.[^/.]+$/, "");
      const category = (categories[i] as GalleryImage["category"]) || "Campus";

      newItems.push({
        id: `upload-g${Date.now()}-${i}`,
        src: publicUrl,
        fallbackSrc: publicUrl,
        alt: caption,
        category: category,
        caption: caption,
      });
    }

    const updated = [...newItems, ...currentImages];
    saveGalleryData(updated);

    return NextResponse.json({
      success: true,
      newItems,
      images: updated,
      message: `Successfully saved ${newItems.length} photo(s)`,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

