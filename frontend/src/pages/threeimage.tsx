import React, { useState, useEffect } from "react";
import { Layout, Card, Button } from "antd";
import AppMenu from "../components/menu";
const { Header, Content, Footer } = Layout;
import IconSlider from "../components/IconSlider"; // Ensure this is the correct path
import "./css/threeimage.css"; // Importing external CSS
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Assume isLoading is part of your auth context
  console.log("Three image page");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  console.log(localStorage.getItem("token"));
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    fetchImages();
  }, []);
  // if (isLoading) {
  //   return <div>Loading...</div>; // Show a loading state while authentication status is being resolved
  // }
  const [selectedValue, setSelectedValue] = useState<boolean | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null); // New state for storing the submission result
  const handleTrueClick = () => {
    setSelectedValue(true);
    setSubmissionResult(null); // Reset the submission result message
  };

  const handleFalseClick = () => {
    setSelectedValue(false);
    setSubmissionResult(null); // Reset the submission result message
  };

  // Style for the selected button
  const selectedStyle = {
    backgroundColor: "green", // Change this color as needed
    color: "white",
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/threeimg", {
        method: "GET",
      });

      if (response.ok) {
        const images = await response.json();
        setImages(images);
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSliderChange = (value: number) => {
    setCurrentIndex(value);
  };

  const sendData = async () => {
    if (selectedValue !== null) {
      try {
        const response = await fetch("http://localhost:8000/nodulevar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedValue }),
        });

        if (!response.ok) {
          throw new Error("Failed to send data to the backend.");
        }

        console.log("Data sent successfully.");
        fetchSubmissionResult(); // Call fetchSubmissionResult after successfully sending data
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.log("No value selected.");
    }
  };

  const fetchSubmissionResult = async () => {
    try {
      const response = await fetch("http://localhost:8000/submissionResult");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setSubmissionResult(result.message);
    } catch (error) {
      console.error("Error fetching submission result:", error);
    }
  };

  return (
    <>
      <AppMenu />
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content className="content">
          <div className="content-wrapper">
            <Card className="image-card">
              <div className="image-container">
                {images.length > 0 && (
                  <img
                    src={images[currentIndex]}
                    alt="Display"
                    className="image"
                  />
                )}
              </div>
              <IconSlider
                min={0}
                max={images.length - 1}
                value={currentIndex}
                onChange={handleSliderChange}
              />
            </Card>
            <Card className="text-card">
              <div className="button-containers">
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Is this a nodule?
                </p>

                <div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleTrueClick}
                    style={selectedValue === true ? selectedStyle : {}}
                  >
                    True
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleFalseClick}
                    style={selectedValue === false ? selectedStyle : {}}
                  >
                    False
                  </Button>
                </div>

                {submissionResult && (
                  <div
                    className="message"
                    style={{ color: selectedValue ? "green" : "red" }}
                  >
                    {submissionResult}
                  </div>
                )}

                <Button
                  type="primary"
                  size="large"
                  onClick={sendData}
                  disabled={selectedValue === null}
                >
                  Submit
                </Button>
              </div>
            </Card>
          </div>
        </Content>
        <Footer className="footer">
          InteliMed.AI ©{new Date().getFullYear()} Created by InteliMed.AI
        </Footer>
      </Layout>
    </>
  );
};

export default App;
