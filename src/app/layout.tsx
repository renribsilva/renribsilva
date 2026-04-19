import { Courier_Prime } from "next/font/google"
import "./globals.css"
import type { Viewport } from 'next'; // Adicione Viewport aqui
import { ThemeProvider } from "../context/theme_provider";
import { SidebarProvider } from "../context/sidebar_provider";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={courier.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}