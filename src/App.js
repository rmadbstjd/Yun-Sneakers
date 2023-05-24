import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./routers";
import { Global } from "@emotion/react";
import { globalStyles } from "./Style/globalstyles";
function App() {
  const queryClient = useRef();
  if (!queryClient.current) {
    queryClient.current = new QueryClient({
      defaultOptions: {
        quereis: {
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      <Global styles={globalStyles} />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
