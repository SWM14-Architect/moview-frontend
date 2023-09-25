import React from 'react';
import HamburgerImg from '../../assets/free-icon-hamburger-7710488.png';
import CloseImg from '../../assets/free-icon-close-151882.png';
import style from '../../styles/hamburgerButton.module.css';


function HamburgerButton(props){
  return (
    <div>
      <div style={{marginRight:"20px"}} onClick={props.onClick}>
        {props.isClickedHamburger ?
          <img src={CloseImg} alt="close" style={{width:"20px", height:"20px"}}/> :
          <img src={HamburgerImg} alt="hamburger" style={{width:"20px", height:"20px"}}/>
        }
      </div>
      <div className={`${style.menu} ${props.isClickedHamburger ? style.active : null}`}>
        {!props.userLogin ? (
          <div className={`${style.menu_nav}`}>
            <button
              className={`blackButton`}
              style={{ marginRight: "15px" }}
              onClick={(e) => props.handleLogin(e)}
            >
              카카오 로그인
            </button>
          </div>
        ) : (
          <div className={`${style.menu_nav}`} style={{ marginRight: "15px" }}>
            <img src={props.userProfile} alt="profile" style={{width:"70px"}} />
            <div style={{lineHeight:"35px", wordBreak:"keep-all", textAlign:"right", fontSize:"0.9em", color:"#212121"}}>
              안녕하세요, {props.userNickname}님
            </div>
            <button
              className={`blackButton`}
              onClick={(e) => props.handleButtonClick(e)}
            >
              {!props.isRoom ? "면접시작 >" : "면접종료 >"}
            </button>
            <button
              className={`blackButton`}
              onClick={(e) => props.handleLogout(e)}
            >
              카카오 로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerButton;