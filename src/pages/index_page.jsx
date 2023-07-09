import React, { useState } from "react";
import Header from "../components/header"
import Footer from "../components/footer"
import Logo from "../components/Logo";

function IndexPage() {
  const [isIndex, setIsIndex] = useState(false);

  const handleButtonClick = () => {
    setIsIndex(true);
  };

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Logo />
      <div style={{ marginTop: "auto", marginBottom: "10%" }}>
        <button className="big-button" onClick={handleButtonClick} style={{background: "#ffffff", color: "#333333", fontSize: "40px", borderRadius: "16px" }}>
          START
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage;
