// components/Breadcrumb.tsx
import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/components.module.css";
import Link from "next/link";

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(segment => segment);

  return (
    <section>
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="/">início</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <li key={path}>
              <span>&gt;&gt; </span>
              <Link href={path}>{decodeURIComponent(segment)}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Breadcrumb;
