import createMDX from "@next/mdx";
import remarkFootnotes from "remark-footnotes";
import remarkSmartypants from "remark-smartypants";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  webpack: (config) => {
    // Não altera a configuração devtool; usa a padrão do Next.js
    return config;
  },
  
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkFootnotes, { inlineNotes: true }],
      remarkSmartypants, 
    ],
  },
});

export default withMDX({
  ...nextConfig,
});
