import Head from "next/head"
import styles from "../styles/mdx.module.css"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <>
      <Head>
        <title>Textos | Petricor</title>
      </Head>
      <div className={styles.mdx}>{children}</div>
      <div className={styles.mdxrodape}></div>
    </>
  )
}