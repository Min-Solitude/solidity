import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
    >
      <Component {...pageProps} />
    </ThirdwebProvider >
  );
}

export default MyApp;
