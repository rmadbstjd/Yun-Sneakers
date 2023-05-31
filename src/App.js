import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./routers";
import { Global } from "@emotion/react";
import { globalStyles } from "./Style/globalstyles";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      quereis: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
