import React from "react";
import "./globals.css";
import BackGround from "../components/BackGround";
import Nav from "../components/Nav";
import Provider from "../providers/provider";
import { ThemeProvider } from "../providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
      <body>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Provider>
              <BackGround />
              <main className="app">
                <Nav />
                {children}
              </main>
            </Provider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
