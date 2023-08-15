import React from "react";
import style from "../styles/footer.module.css";

function Footer() {
  return (
    <footer style={{borderTop:"#e4ebf3 2px solid"}}>
      <div className={`container`}>
        <div style={{width:"100%"}}>
          <div className={`layout-flex-grid-4 ${style.footer_box}`} style={{marginLeft:"auto"}}>
            <div/>
            <div/>
            <div className={`${style.footer_list}`}>
              <h5>PRODUCT</h5>
              <span>How it works</span>
              <span>Pricing</span>
              <span>Docs</span>
            </div>
            <div className={`${style.footer_list}`}>
              <h5>ABOUT</h5>
              <span>Terms & Conditions</span>
              <span>Privacy policy</span>
            </div>
          </div>
          <div style={{height:"1px", backgroundColor:"#e4ebf3", margin:"10px"}} />
          <div style={{textAlign:"center", marginBottom:"20px", color:"#676767"}}>Copyright © 2023 SWM Architect Team All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
