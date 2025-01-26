"use client";
import { TContext, TTheme } from "@/types/contextTypes";
import "./globals.css";
import { createContext, useContext, useEffect, useState } from "react";
import WalletConnectionProvider from "@/components/wallet/WalletConnectionProvider";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Provider } from "react-redux";
import store from "./services/store";

export const GlobalContext = createContext<TContext | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<TTheme>("light"); // Default to light initially

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(JSON.parse(storedTheme));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", JSON.stringify(theme));
    }
  }, [theme]);

  const value = {
    default: 0,
    theme,
    setTheme,
  };

  return (
    <html lang="en" suppressHydrationWarning data-theme={theme}>
      <GlobalContext.Provider value={value}>
        <Provider store={store}>
          <WalletConnectionProvider>
            <body>{children}</body>
          </WalletConnectionProvider>
        </Provider>
      </GlobalContext.Provider>
    </html>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
