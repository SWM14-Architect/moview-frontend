import React from "react";

function Footer() {
  const footerStyle = {
    background: "#f2f2f2",
    padding: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    borderTop: "1px solid #ccc",
    width: "70%",
  };

  return (
    <footer className="custom-footer" style={footerStyle}>
      © 2023 SWM Architect team. All Rights Reserved.
    </footer>
  );
}

export default Footer;
