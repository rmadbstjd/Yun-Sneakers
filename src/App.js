import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./routers";
function App() {
  const queryClient = useRef();
  if (!queryClient.current) {
    queryClient.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      <Router />
    </QueryClientProvider>
  );
}
export default App;
