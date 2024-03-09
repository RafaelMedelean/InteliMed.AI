import React, { useState, useEffect } from "react";
import { Layout, Card } from "antd";
import AppMenu from "../components/menu";
const { Header, Content, Footer } = Layout;
import IconSlider from "../components/IconSlider"; // Ensure this is the correct path
import "./threeimage.css"; // Importing external CSS

const App: React.FC = () => {

  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    fetchImages();
  }, []);

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
              <p>
                Here is some text that can be replaced with whatever content you
                need. This section is for displaying text content opposite the
                image. Adjust the content as needed to fit your requirements.
              </p>
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
