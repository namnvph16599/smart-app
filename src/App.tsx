import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client as apolloClient } from "./apollo";
import "./App.css";

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
          <h1 className="text-3xl font-bold text-center text-[#ccc]">
            Hello world!
          </h1>
        </ConfigProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
