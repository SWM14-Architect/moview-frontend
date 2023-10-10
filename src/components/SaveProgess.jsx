import { toast } from "react-toastify";
import {evaluation_api} from "../api/interview";
import interviewSummaryGenerator from "../utils/interviewSummaryGenerator";

function SaveProgess(props){

    props.setIsLoading(true);
    props.setLoadingMessage("면접 결과를 분석하고 있습니다. 평균 소요 시간은 8 ~ 12초입니다.");
    evaluation_api({interview_id: props.interviewId}).then((res) => {

        props.setIsLoading(false);
        props.setInterviewResult(interviewSummaryGenerator(res.message.evaluations)); // 결과내용을 interviewResultAtom에 저장합니다.
        props.setRoomID("interviewFeedback");
    }).catch((err) => {
        props.setIsLoading(false);
      toast.error(`${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`, {});
    });
};

export default SaveProgess;