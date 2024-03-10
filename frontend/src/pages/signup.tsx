import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import "./css/signup.css";
import logoImage from "../assets/logo.jpg"; // Adjust the path as necessary

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
interface SignupValues {
  email: string;
  password: string;
  confirm: string;
  username: string;
  phone: string;
  donation?: number;
  intro: string;
  gender: string;
  captcha: string;
  medic: boolean;
  university: string; // Add this line

  // Include other fields as necessary
}

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [isMedic, setIsMedic] = useState(false);
  const sendSignUpData = async (formData: SignupValues) => {
    try {
      console.log("formData", formData);
      const response = await fetch("http://localhost:8001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Signup failed:", response.statusText);
        // Optionally, handle signup failure (e.g., show a message to the user)
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Optionally, handle network or other errors (e.g., show an error message to the user)
    }
  };
  const onFinish = (values: SignupValues) => {
    sendSignUpData(values);
    console.log("Received values of form: ", values);
  };
  const handleMedicChange = (e: any) => {
    setIsMedic(e.target.checked);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="40">+40</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="EUR">#</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="container">
      <img
        src={logoImage}
        className="signup-image"
        alt="Descriptive Alt Text"
      />

      <div className="signup-container">
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Sign Up
        </Typography.Title>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="donation"
            label="Donation"
            rules={[
              { required: false, message: "Please input donation amount!" },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="intro"
            label="Intro"
            rules={[{ required: true, message: "Please input Intro" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input the captcha you got!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="medic"
            valuePropName="checked"
            rules={[{ required: false }]}
            {...tailFormItemLayout}
          >
            <Checkbox onChange={handleMedicChange}>
              I am medic or health worker
            </Checkbox>
          </Form.Item>
          {isMedic && (
            <Form.Item
              name="university"
              label="University"
              rules={[
                { required: true, message: "Please input your university!" },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
