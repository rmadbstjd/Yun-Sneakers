import React, { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import authenticate from "./hooks/authenticate";
import userInfoStore from "./store/userInfoStore";
import Router from "./routers";
function App() {
  const { setNickName, setUserId } = userInfoStore();
  const isAuthenticated = localStorage.getItem("isLogin") === "true";
  useEffect(() => {
    authenticate(setNickName, setUserId);
  }, [setNickName, setUserId]);
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
