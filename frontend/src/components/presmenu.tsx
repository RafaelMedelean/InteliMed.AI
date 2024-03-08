import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Dropdown, MenuProps } from "antd";

const { Header } = Layout;

interface Page {
  title: string;
  path: string;
}

const pages: Page[] = [{ title: "", path: "/" }];

const aboutUsMenuItems: MenuProps["items"] = [
  { key: "our-team", label: <Link to="/our-team">Our Team</Link> },
  { key: "faq", label: <Link to="/faq">FAQ</Link> },
  { key: "contact", label: <Link to="/contact">Contact Us</Link> },
];

const AppMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const navMenuItems: MenuProps["items"] = pages.map((page) => ({
    key: page.title,
    label: <Link to={page.path}>{page.title}</Link>,
  }));

  const aboutUsDropdownMenu = <Menu items={aboutUsMenuItems} />;

  return (
    <Layout className="layout" style={{ padding: 0 }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          paddingLeft: 0,
          paddingRight: 0,
          padding: 0,
          //   borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
        >
          {/* Retain "InteliMed.AI" text */}
          <div
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              marginRight: "30px",
            }}
          >
            InteliMed.AI
          </div>
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={navMenuItems}
          style={{
            flex: 1,
            justifyContent: "center",
            border: 0,
            padding: 0,
            backgroundColor: "white",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "30px",
          }}
        >
          {/* "About Us" Dropdown Button */}
          <Dropdown
            menu={aboutUsDropdownMenu}
            onOpenChange={handleOpenChange}
            open={open}
          >
            <Button type="primary">About Us</Button>
          </Dropdown>
          <Button type="primary" style={{ marginLeft: "10px" }}>
            Get Started
          </Button>
        </div>
      </Header>
    </Layout>
  );
};

export default AppMenu;
