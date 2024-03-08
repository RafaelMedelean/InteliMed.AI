import React from "react";
import Meniu from "../components/presmenu";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./prespage.css";

const App: React.FC = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to /login
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to /signup
  };
  return (
    <div className="background-image">
      <Meniu />
      <div className="centered-container">
        <Card
          className="info-card"
          style={{ background: "rgba(255, 255, 255, 0.8)" }}
        >
          <h1 className="name">InteliMed.AI</h1>
          <p>
            A transformative platform designed to redefine medical education,
            with a special focus on Radiology. Leveraging the power of Computer
            Vision and neural networks, our platform offers an innovative
            solution to the inherent subjectivity in radiological
            interpretation.
          </p>
          <p>
            By enabling the identification of nuanced image features and
            facilitating access to a diverse global case repository, we aim to
            significantly enhance the learning curve for future doctors.
            InteliMed.Ai is committed to optimizing medical learning, making it
            faster, more accurate, and universally accessible.
          </p>
          <p>
            Ideal for medical universities and individual learners alike, our
            platform is poised to become an indispensable tool in the education
            of the next generation of radiologists.
          </p>
          <div className="button-container">
            <Button
              type="primary"
              size="large"
              onClick={handleLoginClick}
              style={{ marginRight: "10px" }}
            >
              Login
            </Button>
            <Button type="primary" size="large" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;
