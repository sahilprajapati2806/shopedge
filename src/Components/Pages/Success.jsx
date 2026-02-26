import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "green" }}>🎉 Payment Successful!</h1>
      <p>Your order has been placed successfully.</p>
      <button onClick={() => navigate("/")}>
        Go To Home
      </button>
    </div>
  );
};

export default Success;