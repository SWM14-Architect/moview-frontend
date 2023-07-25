

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/room_atom";
import InterviewForm from "./room/interviewForm";

function Room() {
  const [roomID, setRoomID] = useRecoilState(roomIdAtom);
  const navigate = useNavigate();

  const pages = {
    "interviewForm": <InterviewForm />,
  };

  useEffect(() => {
    // pages 안에 roomID 키가 없는 경우에는 navigate("/error")를 반환합니다.
    if (!pages.hasOwnProperty(roomID)) {
      setRoomID("interviewForm");
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomID, navigate])


  return(
    <div>
      {pages[roomID] ? pages[roomID] : null}
    </div>
  )
}

export default Room;