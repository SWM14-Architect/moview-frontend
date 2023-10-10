import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 rounded-t-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://github.com/SWM14-Architect"
            className="flex items-center mb-4 sm:mb-0"
          >
            <span className="self-center text-sm font-semibold whitespace-nowrap text-gray-200 dark:text-white">
              © 2023 SWM Architect Team All Rights Reserved.
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-200 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="https://swmaestro.org/sw/main/contents.do?menuNo=200002"
                className="mr-4 hover:underline md:mr-6 "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://swmaestro.org/sw/main/contents.do?menuNo=200006"
                className="mr-4 hover:underline md:mr-6 "
              >
                Location
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-200 sm:text-center dark:text-white-100">
          이 성과는 2023년도 과학기술정보통신부의 재원으로 정보통신기획평가원의
          지원을 받아 수행된 프로젝트입니다. (IITP-2023-SW마에스트로과정)
        </span>
      </div>
    </footer>
  );
}

export default Footer;
