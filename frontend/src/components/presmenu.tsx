import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Dropdown, MenuProps } from "antd";
// import "antd/dist/antd.css"; // Uncomment if Ant Design CSS is not globally imported
import { useNavigate } from "react-router-dom"; // Import useNavigate
const aboutUsMenuItems: MenuProps["items"] = [
  { key: "our-team", label: <Link to="/our-team">Our Team</Link> },
  { key: "faq", label: <Link to="/faq">FAQ</Link> },
  { key: "contact", label: <Link to="/contact">Contact Us</Link> },
];
const { Header } = Layout;

const AppMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to /signup
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{ marginRight: "30px", fontWeight: "bold", fontSize: "20px" }}
        >
          InteliMed.AI
        </div>

        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <Dropdown
            menu={{ items: aboutUsMenuItems }} // Changed from 'overlay' to 'menu'
            onOpenChange={toggleOpen} // Changed from 'onVisibleChange'
            open={open} // Changed from 'visible'
            trigger={["click"]}
          >
            <Button type="primary">About Us</Button>
          </Dropdown>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleSignUpClick}
          >
            Get Started
          </Button>
        </div>
      </Header>
    </Layout>
  );
};

export default AppMenu;
