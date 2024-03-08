import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Ensure you have an App.css file for custom styles
import logoImage from "../assets/image.png"; // Adjust the path as necessary
import photo from "../assets/poza.png"; // Adjust the path as necessary

interface loginValues {
  username: string;
  password: string;
  remember: boolean;
}

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: loginValues) => {
    try {
      console.log("Received values of form: ", values);
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        setIsModalVisible(true);
      }
    } catch (error) {
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="login-page">
      <img src={photo} className="signup-image" alt="Descriptive Alt Text" />

      <div className="login-container">
        <div className="login-header">
          <img src={logoImage} alt="InteliMed.AI Logo" className="login-logo" />
          <h1>Welcome to InteliMed.AI</h1>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>

        <Modal
          title="Login Failed"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <p>There was an issue logging in. Please try again.</p>
        </Modal>
      </div>
    </div>
  );
};

export default App;
