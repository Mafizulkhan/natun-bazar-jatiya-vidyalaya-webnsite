import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: "https://mafizulkhan.github.io/natun-bazar-jatiya-vidyalaya-webnsite/sitemap.xml",
  };
}
