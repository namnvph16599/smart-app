import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <h1 className="text-3xl font-bold text-center text-[#ccc]">
          Hello world!
        </h1>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
