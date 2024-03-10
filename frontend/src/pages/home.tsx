import React, { useEffect } from "react"; // Import useEffect
import Menu from "../components/menu";
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  // console.log("Home page");
  const { isAuthenticated, isLoading } = useAuth(); // Assume isLoading is part of your auth context
  const navigate = useNavigate();
   console.log(localStorage.getItem("token"));
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while authentication status is being resolved
  }

  return (
    <div>
      <Menu />
      <h1>Welcome to the Home page!</h1>
      {/* Additional content */}
    </div>
  );
};

export default Home;
