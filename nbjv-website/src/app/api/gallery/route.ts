import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GALLERY_IMAGES, GalleryImage } from "@/lib/data";

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
    console.error("Error reading gallery.json:", err);
  }
  return GALLERY_IMAGES;
}

function saveGalleryData(images: GalleryImage[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(images, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing gallery.json:", err);
    return false;
  }
}

// GET /api/gallery
export async function GET() {
  const images = getGalleryData();
  return NextResponse.json({ success: true, images }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

// POST /api/gallery (Direct addition of URL/custom photo or reset)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "reset") {
      saveGalleryData(GALLERY_IMAGES);
      return NextResponse.json({ success: true, images: GALLERY_IMAGES, message: "Gallery reset to default." });
    }

    if (body.action === "set_all" && Array.isArray(body.images)) {
      saveGalleryData(body.images);
      return NextResponse.json({ success: true, images: body.images });
    }

    // Add single item
    const { src, caption, category, alt, fallbackSrc } = body;
    if (!src || !caption) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const currentImages = getGalleryData();
    const newItem: GalleryImage = {
      id: `custom-g${Date.now()}`,
      src,
      fallbackSrc: fallbackSrc || src,
      alt: alt || caption,
      category: category || "Campus",
      caption,
    };

    const updated = [newItem, ...currentImages];
    saveGalleryData(updated);

    return NextResponse.json({ success: true, image: newItem, images: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/gallery
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing image id" }, { status: 400 });
    }

    const currentImages = getGalleryData();
    const updated = currentImages.filter((img) => img.id !== id);
    saveGalleryData(updated);

    return NextResponse.json({ success: true, images: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

