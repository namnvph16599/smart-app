import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import { client as apolloClient } from "./apollo";
import AppRouter from "./app-router";
import "./styles/App.css";

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
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorBorder: "#94A3B8",
                controlHeightSM: 40,
                fontSize: 14,
                fontFamily: "Lexend",
                hoverBorderColor: "#1B998B",
                activeBorderColor: "#1B998B",
                controlHeight: 40,
              },
              Button: {
                colorPrimaryBg: "#1B998B",
                colorPrimaryBgHover: "#1B998B",
                defaultColor: "#1B998B",
                fontWeight: 500,
                fontSize: 14,
                fontFamily: "Lexend",
              },
            },
          }}
        >
          <AppRouter />
        </ConfigProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
