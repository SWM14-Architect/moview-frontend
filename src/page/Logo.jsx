import React from "react";
import tempLogo from './resources/temp_logo.png';
// 로고 컴포넌트
function Logo() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <img src={tempLogo} alt="Temp Logo" style={{ display: 'block', margin: 'auto' }} />
    </div>
  );
}

export default Logo;
