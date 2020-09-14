import App from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron, debug } from "../styletron";
import { StilrenProvider } from "stilren";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <StilrenProvider
          styletron={styletron}
          mediaPrefixes={{
            desktop: "(min-width: 1280px)",
            tablet: "(min-width: 769px) and (max-width: 1279px)",
            mobile: "(max-width: 768px)",
          }}
        >
          <Component {...pageProps} />
        </StilrenProvider>
      </StyletronProvider>
    );
  }
}
