import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/interviewRoomAtom";
import InterviewInput from "./interviewRoom/interviewInput";
import InterviewChat from "./interviewRoom/interviewChat";
import InterviewFeedback from "./interviewRoom/interviewFeedback";
import {useTitle} from "../utils/useTitle";
import {SERVICE_TITLE} from "../constants/serviceConst";

function InterviewRoom() {
  const [roomID, setRoomID] = useRecoilState(roomIdAtom);
  const navigate = useNavigate();

  const pages = {
    "interviewInput": <InterviewInput />,
    "interviewChat": <InterviewChat />,
    "interviewFeedback": <InterviewFeedback />,
  };

  useEffect(() => {
    // pages 안에 roomID 키가 없는 경우에는 navigate("/error")를 반환합니다.
    if (!pages.hasOwnProperty(roomID)) {
      setRoomID("interviewInput");
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomID, navigate])

  useTitle(`${SERVICE_TITLE} - 가상면접`);

  return pages[roomID] ? pages[roomID] : null
}

export default InterviewRoom;