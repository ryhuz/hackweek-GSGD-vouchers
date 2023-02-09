import { BaseTheme } from "@lifesg/react-design-system/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={BaseTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
