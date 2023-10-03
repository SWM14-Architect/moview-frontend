import React, { useEffect, useState } from "react";
import style from "../styles/header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roomIdAtom } from "../store/interviewRoomAtom";
import {
  userLoginAtom,
  userNicknameAtom,
  userProfileAtom,
} from "../store/userAtom";
import { jwt_token_remove_api, oauth_url_api } from "../api/jwt";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo192.png";

const navigation = [{ name: "면접 시작", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoom, setIsRoom] = useState(false);
  // const [, setRoomID] = useRecoilState(roomIdAtom);
  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  // const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);
  // const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  // const handleLogin = async () => {
  //   await oauth_url_api()
  //   .then((res) => {
  //     window.location.href = res.data["kakao_oauth_url"];
  //   })
  //   .catch((err) => {
  //   });
  // };

  // const handleLogout = async () => {
  //   await jwt_token_remove_api()
  //   .then((res) => {
  //     alert("정상적으로 로그아웃이 되었습니다.");
  //     setUserLogin(false);
  //     setUserNickname("");
  //     setUserProfile("");
  //     navigate("/");
  //   })
  //   .catch((err) => {

  //   });
  // };

  // useEffect(() => {
  //   if (window.location.pathname === "/room") {
  //     setIsRoom(true);
  //   } else {
  //     setIsRoom(false);
  //   }
  // }, [location]);

  // const handleButtonClick = (e) => {
  //   e.preventDefault();

  //   if (!isRoom) {
  //     setRoomID("modeSelect");
  //     navigate("/room");
  //   } else {
  //     setRoomID("modeSelect");
  //     navigate("/");
  //   }
  // };

  return (
    <Disclosure
      as="nav"
      className="bg-white-800 border-b border-b-2 border-gray-150"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MobileMenuButton open={open}/>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <CompanyLogo />
                <MenuButton isRoom={isRoom} />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ProfileDropdown />
              </div>
            </div>
          </div>
          <MenuButtonResized isRoom={isRoom} />
        </>
      )}
    </Disclosure>
  );
}

function MobileMenuButton(props) {
  return (
    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open main menu</span>
      {props.open ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  );
}

function CompanyLogo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <img className="h-8 w-auto" src={logo} alt="Your Company" />
    </div>
  );
}

//헤더에 버튼을 추가하고 싶다면, 아래 함수에 버튼을 추가하세요.
function MenuButton(props) {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        <button
          className={classNames(
            "bg-gray-900 text-white hover:bg-indigo-600 hover:text-white",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          {!props.isRoom ? "면접 시작" : "면접 종료"}
        </button>
      </div>
    </div>
  );
}

//로그인 시 나오는 프로필
function ProfileDropdown() {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Logout
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

//가로로 화면을 줄였을 때 메뉴버튼이 리사이징 되는 것 렌더링. 헤더에 버튼을 추가했다면, 여기에도 마찬가지로 추가시기 바랍니다.
function MenuButtonResized(props) {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Disclosure.Button
          as="a"
          className={classNames(
            "bg-gray-900 text-white hover:bg-indigo-600 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          {!props.isRoom ? "면접 시작" : "면접 종료"}
        </Disclosure.Button>
      </div>
    </Disclosure.Panel>
  );
}

export default Header;
