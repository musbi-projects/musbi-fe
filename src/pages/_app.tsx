import type { AppProps } from 'next/app';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { theme, GlobalStyle } from '@/styles';
import '/public/assets/fonts/fonts.css';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
