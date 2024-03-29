import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../components/auth";
import "./css/login.css"; // Ensure you have an App.css file for custom styles
import logoImage from "../assets/image.png"; // Adjust the path as necessary
import photo from "../assets/InteliMed.AI.png"; // Adjust the path as necessary

interface loginValues {
  username: string;
  password: string;
  remember: boolean;
}

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
 // const auth= useAuth();
  const onFinish = async (values: loginValues) => {
    try {
      console.log("Received values of form: ", values);

      const response = await fetch("http://localhost:8001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json(); // Parse the JSON response body
      if (response.ok) {

        //console.log("Login successful");
        //console.log("data",data); 
      console.log("data",data);
        navigate("/threeimage"); 
        console.log("Navigated to home page");
      } else {
        console.error("Login failed:", data.error); // Log the error from the response
        setIsModalVisible(true); // Show modal or error message to the user
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any network or unexpected errors
      setIsModalVisible(true); // Show modal or error message to the user
    }
  };

  const handleOk = () => {
    setIsModalVisible(false); // Hide the modal on confirmation
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
