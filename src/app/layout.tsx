"use client";
import { TContext, TTheme } from "@/types/contextTypes";
import "./globals.css";
import { createContext, useContext, useEffect, useState } from "react";
import WalletConnectionProvider from "@/components/wallet/WalletConnectionProvider";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Provider } from "react-redux";
import store from "./services/store";
import { IUser } from "@/types/userTypes";
import { baserUrl } from "./services/constant";

export const GlobalContext = createContext<TContext | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<TTheme>("light"); // Default to light initially
  const [user, setUser] = useState<IUser | null>(null);
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

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${baserUrl}/user`, {
            method: "GET",
            headers: {
              Authorization: token, // Send token without Bearer prefix
              "x-api-key": process.env.NEXT_PUBLIC_CLIENT_API_KEY as string,
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          setUser(data?.user);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchUser();
    }
  }, []);

  const value = {
    default: 0,
    theme,
    setTheme,
    user,
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
