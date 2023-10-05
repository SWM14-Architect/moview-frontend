import React from "react";

function Footer() {
  return (
    // <footer style={{borderTop:"#e4ebf3 2px solid"}}>
    //   <div className={`container`}>
    //     <div style={{width:"100%"}}>
    //       <div className={`layout-flex-grid-4 ${style.footer_box}`}>
    //         <div className={`${style.footer_list}`}>
    //           <h5>모두의 인터뷰</h5>
    //           <span>모뷰 | Team : Architect</span>
    //           <span>서울특별시 강남구 테헤란로 311 아남타워 7층</span>
    //           <span>everyinterview@gmail.com</span>
    //         </div>
    //         <div/>
    //         <div className={`${style.footer_list}`}>
    //           <h5>PRODUCT</h5>
    //           <span>How it works</span>
    //           <span>Pricing</span>
    //           <span>Docs</span>
    //         </div>
    //         <div className={`${style.footer_list}`}>
    //           <h5>ABOUT</h5>
    //           <span>Terms & Conditions</span>
    //           <span>Privacy policy</span>
    //         </div>
    //       </div>
    //       <div style={{height:"1px", backgroundColor:"#e4ebf3", margin:"10px"}} />
    //       <div style={{textAlign:"center", marginBottom:"20px", color:"#676767"}}>Copyright © 2023 SWM Architect Team All rights reserved.</div>
    //     </div>
    //   </div>
    // </footer>

<footer class="bg-gray-900 rounded-lg shadow dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://github.com/SWM14-Architect" class="flex items-center mb-4 sm:mb-0">
                <span class="self-center text-sm font-semibold whitespace-nowrap text-gray-200 dark:text-white">© 2023 SWM Architect Team All Rights Reserved.</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-200 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="https://swmaestro.org/sw/main/contents.do?menuNo=200002" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                {/* <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li> */}
                <li>
                    <a href="https://swmaestro.org/sw/main/contents.do?menuNo=200006" class="mr-4 hover:underline md:mr-6 ">Location</a>
                </li>
                {/* <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li> */}
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-200 sm:text-center dark:text-white-100">이 성과는 2023년도 과학기술정보통신부의 재원으로 정보통신기획평가원의 지원을 받아 수행된 프로젝트입니다. (IITP-2023-SW마에스트로과정)</span>
    </div>
</footer>


  );
}

export default Footer;
