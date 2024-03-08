import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Switch, Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Logo from "../assets/logo.jpg"; // Adjust the path as necessary

const { Header } = Layout;

interface Page {
  title: string;
  path: string;
}

const pages: Page[] = [
  { title: "Home", path: "/home" },
  { title: "PresPage", path: "/" },
  { title: "ThreeImage", path: "/threeimage" },
  { title: "TwoImage", path: "/twoimage" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const menuItems: MenuProps["items"] = settings.map((setting) => ({
    key: setting,
    label: setting,
  }));

  const userMenu = <Menu items={menuItems} />;

  const navMenuItems: MenuProps["items"] = pages.map((page) => ({
    key: page.title,
    label: <Link to={page.path}>{page.title}</Link>,
  }));

  return (
    <Layout className="layout" style={{ padding: 0 }}>
      {" "}
      {/* Override padding here */}
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: 0,
          paddingRight: 0,
          padding: 0, // Override padding here
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "40px",
              marginLeft: "30px",
            }}
          />
          <div style={{ color: "white", fontWeight: "bold" }}>InteliMed.Ai</div>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={navMenuItems}
          style={{ flex: 1, justifyContent: "center", border: 0, padding: 0 }} // Override padding here
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Dropdown menu={userMenu} onOpenChange={handleOpenChange} open={open}>
            <Avatar
              style={{ backgroundColor: "transparent" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
          <Switch
            style={{
              marginLeft: "10px",
            }}
          />
        </div>
      </Header>
    </Layout>
  );
};

export default AppMenu;
