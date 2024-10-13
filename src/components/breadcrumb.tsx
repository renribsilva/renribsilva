// components/Breadcrumb.tsx
import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/components.module.css";

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(segment => segment);

  return (
    <section>
      <ul className={styles.breadcrumb}>
        <li>
          <a href="/">Início</a>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={path}>
              <span>&gt;&gt;</span>
              <li>
                <a href={path}>{segment}</a>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};

export default Breadcrumb;
