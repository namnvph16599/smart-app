import "./App.css";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider>
      <h1 className="text-3xl font-bold text-center text-[#ccc]">
        Hello world!
      </h1>
    </ConfigProvider>
  );
}

export default App;
