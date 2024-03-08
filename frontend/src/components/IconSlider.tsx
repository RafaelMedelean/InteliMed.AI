import React from "react";
import { Slider } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";

interface IconSliderProps {
  max: number;
  min: number;
  value: number; // Current value of the slider
  onChange: (value: number) => void; // Function to call when the slider value changes
}

const IconSlider: React.FC<IconSliderProps> = ({
  max,
  min,
  value,
  onChange,
}) => {
  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? { color: "#1890ff" } : {}; // Styles applied inline
  const nextColorCls = value >= mid ? {} : { color: "#1890ff" }; // Styles applied inline

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      {/* Inline styles for the wrapper */}
      <FrownOutlined style={{ ...preColorCls, marginRight: "8px" }} />{" "}
      {/* Inline styles for the left icon */}
      <div style={{ width: "200px" }}>
        {" "}
        {/* Inline styles for the slider's container */}
        <Slider min={min} max={max} value={value} onChange={onChange} />
      </div>
      <SmileOutlined style={{ ...nextColorCls, marginLeft: "8px" }} />{" "}
      {/* Inline styles for the right icon */}
    </div>
  );
};

export default IconSlider;
