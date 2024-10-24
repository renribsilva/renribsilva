import createMDX from "@next/mdx";
import remarkFootnotes from "remark-footnotes";
import remarkSmartypants from "remark-smartypants";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
