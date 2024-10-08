import styles from "../styles/layout.module.css";
import React from "react";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <>
      <div className={styles.layout_mdx}>{children}</div>
      <div className={styles.layout_mdxrodape}></div>
    </>
  );
}