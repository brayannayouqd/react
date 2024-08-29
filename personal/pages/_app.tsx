import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import DefaultLayout from "@/layouts/default";

const queryClient = new QueryClient()

function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppWrapper>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
