"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isMobile: boolean;
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 700;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };
  
  return (
    <SidebarContext.Provider
      value={{
        isMobile,
        isMobileOpen,
        toggleMobileSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
