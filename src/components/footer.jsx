import React from "react";

function Footer() {
  return (
    <footer style={{borderTop:"#e4ebf3 2px solid"}}>
      <div className={`container`}>
        <div style={{width:"100%"}}>
          <div style={{textAlign:"center", marginBottom:"20px", fontSize:"2em"}}>Footer</div>
          <div style={{height:"1px", backgroundColor:"#e4ebf3", margin:"10px"}} />
          <div style={{textAlign:"center", marginBottom:"20px", color:"#676767"}}>Copyright © 2023 SWM Architect Team All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
