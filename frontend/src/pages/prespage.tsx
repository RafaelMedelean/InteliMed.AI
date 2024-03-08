import React from "react";
import Meniu from "../components/presmenu";
import backgroundImage from "../assets/prespage.png"; // Import the image
import "./prespage.css";

const App: React.FC = () => {
  return (
    <>
      <Meniu />
      {/* Use inline style for background-image */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default App;
