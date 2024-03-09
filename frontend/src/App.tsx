import { ConfigProvider, Space } from "antd";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import PresPage from "./pages/prespage";
import SignUp from "./pages/signup";
import ThreeImage from "./pages/threeimage";
import TwoImage from "./pages/twoimages";
import { AuthProvider } from "./components/auth";

const App: React.FC = () => (
  <AuthProvider>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "blue",
          colorBgBase: "",
          borderRadius: 2,
          colorFillSecondary: "lightblue",

          // Alias Token
          // colorBgContainer: "white",
          // colorBgLayout: "pink",
        },
      }}
    >
      <Space>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<PresPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/twoimage" element={<TwoImage />} />
              <Route path="/threeimage" element={<ThreeImage />} />
            </Routes>
          </div>
        </Router>
      </Space>
    </ConfigProvider>
  </AuthProvider>
);

export default App;
