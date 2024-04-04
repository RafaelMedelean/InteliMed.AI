import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Result } from "antd";
import AppMenu from "../components/menu";
const { Header, Content, Footer } = Layout;
import IconSlider from "../components/IconSlider"; // Ensure this is the correct path
import "./css/threeimage.css"; // Importing external CSS
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";

// const getData = async () => {
//   try {
//     const rez = await fetch("http://127.0.0.1:8000/next_image");
//     const data = await rez.json();
//     //console.log("data", data);
//     return data;

//   } catch (err) {
//     return undefined
//   }
// };

const getData = async (param: string | null) => {
  try {
    // Construiește URL-ul în funcție de parametru
    const url = param
      ? `http://127.0.0.1:8000/next_image?param=${param}`
      : `http://127.0.0.1:8000/next_image?param=null`;

    const rez = await fetch(url);
    const data = await rez.json();
    //console.log("data", data);
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return undefined;
  }
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // console.log("Three image page");
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
  }, [isLoading, navigate]);

  // console.log(localStorage.getItem("token"));
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [value, setValue] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getData(null),
      // fetchImages()
    ])
      .then((results) => {
        setValue(results[0] ?? null);
        setImages(results[0].image ?? []);
        // setImages(results[1] ?? []);
      })
      .finally(() => {
        setLoading(false);
      });

    //  fetchData(); // to remove
  }, []);

  console.log("value", value);
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

  const handleSliderChange = (value: number) => {
    setCurrentIndex(value);
  };
  const sendData = async () => {
    if (selectedValue !== null) {
      try {
        // Trimite valoarea selectată la server
        const response = await fetch("http://localhost:8001/nodulevar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedValue }),
        });
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Failed to send data to the backend.");
        }
        console.log("Data sent successfully.");

        // Dacă selectedValue este false, preia datele pentru ultima imagine

        try {
          // Construieste URL-ul cu parametrii query
          const url = new URL("http://127.0.0.1:8000/check_image"); // Schimba portul si adresa daca este necesar
          url.searchParams.append("image", value?.npy);
          url.searchParams.append("answer", selectedValue ? "1" : "0");

          const response = await fetch(url);
          const data = await response.json();
          console.log("dataaaaa ce vine:", data);
          console.log("dataval", Number(true));
          //console.log("dataaaaa:", data === true);
          if (true != data) {
            console.log("dataaaaa true:");
            Promise.all([
              getData(images[0]),
              // fetchImages()
            ]).then((results) => {
              setValue(results[0] ?? null);
              setImages(results[0].image ?? []);
              // setImages(results[1] ?? []);
            });
          } else {
            console.log("dataaaaa false:");
            Promise.all([
              getData(null),
              // fetchImages()
            ]).then((results) => {
              setValue(results[0] ?? null);
              setImages(results[0].image ?? []);
              // setImages(results[1] ?? []);
            });
          }

          console.log("Response from API:", data);
          // Aici poti actualiza starea in functie de raspunsul API-ului
        } catch (error) {
          console.error("Error sending data:", error);
        }

        // Apoi, preia rezultatul trimiterei
        fetchSubmissionResult();
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      console.log("No value selected.");
    }
  };

  const fetchSubmissionResult = async () => {
    try {
      const response = await fetch("http://localhost:8001/submissionResult");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // console.log("Submission result:", result);
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
                    src={`http://localhost:8001${images[currentIndex]}`}
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
