import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/room_atom";


function InterviewButton({text, style}){
  const navigate = useNavigate();
  const [, setRoomID] = useRecoilState(roomIdAtom);

  const moveToPage = (pageName) => {
    setRoomID(pageName);
    navigate("/room");
  }

  const moveToHome = () => {
    alert("정말로 면접을 종료하시겠습니까?\n나중에 alert 말고, 선택지로 해서 취소도 가능하게 만들기");
    setRoomID("interviewInput");
    navigate("/");
  }

  return (
    <button className={`blackButton`} style={style} onClick={window.location.pathname !== '/room' ? () => moveToPage("interviewInput") : () => moveToHome()}>{text}</button>
  );
}

export default InterviewButton;