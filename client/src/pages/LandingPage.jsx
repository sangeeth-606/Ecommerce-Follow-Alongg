import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => navigate("/signup")}>
        Sign Up
      </button>
      <button style={buttonStyle} onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}

export default LandingPage;
