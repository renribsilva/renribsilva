'use client'

import React from "react"
import styles from "./components.module.css"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import Footer from "./footer";
import { useSidebar } from "../../context/sidebar_provider";

type NavItem = {
  name: string;
  path?: string;
};

const navItems: NavItem[] = [
  { name: "início", path: `/` },
  { name: "textos", path: `/textos` },
  { name: "arquivo", path: `/arquivo` },
  { name: "projetos", path: `/projetos` },
  { name: "sobre", path: `/sobre` },
];

const AppSidebar: React.FC = () => {

  const { isMobileOpen, isMobile, toggleMobileSidebar} = useSidebar();
  const pathname = usePathname();
  
  const sidebarClass = isMobile && isMobileOpen 
    ? `${styles.appsidebar_container} ${styles.appsidebar_mobile_open}` 
    : styles.appsidebar_container;

  const handleItemClick = () => {
    if (isMobile && isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const renderMenuItems = (
    navItems: NavItem[]
  ) => (
    <ul className={styles.appsidebar_navbar}>
      {navItems.map((subItem) => {
        const isActive = subItem.path === '/' ? pathname === '/' : pathname.startsWith(subItem.path);
        return (
          <li key={subItem.name} className={`${styles.appsidebar_navitem} ${isActive ? styles.active : ''}`}>
            <Link
              href={subItem.path}
              onClick={handleItemClick}
            >
              {subItem.name}
            </Link>
          </li>
        );
      })}
    </ul>
  )

  return (
    <aside className={sidebarClass}>
      <div>
        {renderMenuItems(navItems)}
      </div>
      <div>
        <Footer/>
      </div>
    </aside>
  )
}

export default AppSidebar