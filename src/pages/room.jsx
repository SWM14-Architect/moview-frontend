
import Input from "./room/input";
import Chat from "./room/chat";
import Result from "./room/result";
import EndPage from "./room/end";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/room_atom";

function Room() {
  const [roomID,] = useRecoilState(roomIdAtom);
  const navigate = useNavigate();

  const pages = {
    "input": <Input />,
    "chat": <Chat />,
    "result": <Result />,
    "end": <EndPage />
  };

  useEffect(() => {
    // pages 안에 roomID 키가 없는 경우에는 navigate("/error")를 반환합니다.
    if (!pages.hasOwnProperty(roomID)) {
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