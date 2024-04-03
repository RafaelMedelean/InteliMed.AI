import  { useState, useEffect } from "react";
import { Layout, Card, Button } from "antd";
import AppMenu from "../components/menu";
import IconSlider from "../components/IconSlider"; // Ensure this is the correct path
import "./css/threeimage.css"; // Importing external CSS
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const getData = async (param) => {
  try {
    const url = param
      ? `http://127.0.0.1:8000/next_image?param=${param}`
      : `http://127.0.0.1:8000/next_image?param=null`;
    const rez = await fetch(url);
    const data = await rez.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return undefined;
  }
};

const App = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8001/api/users/current", {
      method: "POST",
      credentials: "include", // Necessary for sessions/cookies to be sent
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Not authenticated on Home page");
      })
      .then((data) => {
        if (!data.user) {
          throw new Error("Not authenticated");
        }
        setIsLoading(false); // User is authenticated
      })
      .catch((error) => {
        console.error("Authentication check failed:", error);
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);
    getData(null)
      .then((result) => {
        setValue(result ?? null);
        setImages(result?.image ?? []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSliderChange = (value) => {
    setCurrentIndex(value);
  };

  const handleButtonClick = async (selectedValue) => {
    try {
      const response = await fetch("http://localhost:8001/nodulevar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the backend.");
      }

      const nextAction = selectedValue ? images[0] : null;
      const result = await getData(nextAction);
      setValue(result ?? null);
      setImages(result?.image ?? []);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              {images.length > 0 && (
                <img
                  src={`http://localhost:8001${images[currentIndex]}`}
                  alt="Display"
                  className="image"
                />
              )}
              <IconSlider
                min={0}
                max={images.length - 1}
                value={currentIndex}
                onChange={handleSliderChange}
              />
            </Card>
            <Card className="text-card">
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
                  onClick={() => handleButtonClick(true)}
                >
                  True
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleButtonClick(false)}
                >
                  False
                </Button>
              </div>
            </Card>
          </div>
        </Content>
        <Footer>
          InteliMed.AI ©{new Date().getFullYear()} Created by InteliMed.AI
        </Footer>
      </Layout>
    </>
  );
};

export default App;
