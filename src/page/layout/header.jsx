import React from "react";

function Header() {
  return (
    <header className="custom-header" style={headerStyle}>
      취준생을 위한 면접 연습 서비스
    </header>
  );
}

export default Header;

const headerStyle = {
  background: "#f2f2f2",
  padding: "20px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  width: "70%",
  margin: "0 auto",
  borderBottom: "1px solid #ccc",
};