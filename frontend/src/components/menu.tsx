import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Switch, Avatar, MenuProps, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Logo from "../assets/logo.jpg"; // Adjust the path as necessary

const { Header } = Layout;

interface Page {
  title: string;
  path: string;
}

const pages: Page[] = [
  { title: "Home", path: "/home" },
  // { title: "PresPage", path: "/" },
  { title: "ThreeImage", path: "/threeimage" },
  { title: "TwoImage", path: "/twoimage" },
];
const handleLogout = () => {
  fetch("http://localhost:8001/api/users/logout", {
    method: "POST",
    credentials: "include", // Necessary for cookies to be sent
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful logout, e.g., redirecting to login page
        console.log("Logout successful");
      }
    })
    .catch((error) => console.error("Error logging out:", error));
};

const settings = [
  "Profile",
  "Account",
  "Dashboard",
  { title: "Logout", action: handleLogout },
];

const AppMenu: React.FC = () => {
  const userMenu = (
    <Menu
      items={settings.map((setting) =>
        typeof setting === "string"
          ? { key: setting, label: setting }
          : {
              key: setting.title,
              label: setting.title,
              onClick: setting.action,
            }
      )}
    />
  );
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
          {/* <Dropdown menu={{items:[userMenu]}} onOpenChange={handleOpenChange} open={open}> */}
          <Popover
            content={userMenu}
            title="Title"
            trigger="click"
            // open={open}
            // onOpenChange={handleOpenChange}
          >
            <Avatar
              style={{ backgroundColor: "transparent" }}
              icon={<UserOutlined />}
            />
          </Popover>
          {/* </Dropdown> */}
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
