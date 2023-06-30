import type { AppProps } from "next/app";

import { theme } from "@/chakra/theme";
import { ChakraProvider } from "@chakra-ui/react";

import RootLayout from "@/components/Layout/RootLayout";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
