import { useEffect, useState } from "react";
import "@/styles/globals.css";
import AppBar from "@/components/AppBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return false;
  return (
    <div>
      <AppBar />
      <Component {...pageProps} />
    </div>
  );
}
