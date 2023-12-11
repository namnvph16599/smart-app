import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider, ThemeConfig } from "antd";
import { client as apolloClient } from "./apollo";
import AppRouter from "./app-router";
import "./styles/App.css";
import "handsontable/dist/handsontable.full.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const antdTheme: ThemeConfig = {
  components: {
    Input: {
      colorBorder: "#94A3B8",
      controlHeightSM: 40,
      fontSize: 14,
      fontFamily: "Lexend",
      hoverBorderColor: "#1B998B",
      activeBorderColor: "#1B998B",
      controlHeight: 40,
      controlHeightLG: 56,
    },
    Button: {
      colorPrimaryBg: "#1B998B",
      colorPrimaryBgHover: "#1B998B",
      defaultColor: "#1B998B",
      fontWeight: 500,
      fontSize: 14,
      controlHeight: 40,
      fontFamily: "Lexend",
      colorPrimaryHover: "#1B998B",
    },
    Steps: {
      colorPrimary: "#1B998B",
    },
    Select: {
      controlHeight: 40,
    },
    Spin: {
      colorBgBase: "#1B998B",
    },
  },
};

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={antdTheme}>
          <AppRouter />
        </ConfigProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
