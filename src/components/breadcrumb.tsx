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
            <React.Fragment key={path}>
              <span>&gt;&gt;</span>
              <li>
                <Link href={path}>{segment}</Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};

export default Breadcrumb;
