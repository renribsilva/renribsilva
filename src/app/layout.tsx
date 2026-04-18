import { ThemeProvider } from "../components/tsx/theme_provider";
import { Courier_Prime } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "../context/sidebar_context";
import type { Viewport } from 'next'; // Adicione Viewport aqui

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