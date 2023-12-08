import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client as apolloClient } from "./apollo";
import "./App.css";
import AppRouter from "./app-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <AppRouter />
        </ConfigProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
