import {INTERVIEW_RESULT_DEFAULT_VALUE} from "../constants/interviewRoomConst";


function interviewSummaryGenerator(interviewResults){
  const interviewSummary = JSON.parse(JSON.stringify(INTERVIEW_RESULT_DEFAULT_VALUE));
  interviewSummary.interviewResults = interviewResults.map(result => ({
    question_id: result.question_id,
    question: result.question,
    answer: result.answer,
    analysis: result.evaluation
  }));
  return interviewSummary;
}

export default interviewSummaryGenerator;