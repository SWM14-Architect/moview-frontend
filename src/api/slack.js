import {API_INSTANCE_WITH_TOKEN} from "./api_instance";
import moment from "moment-timezone";

export const slack_feedback_api = ( {user_message} ) => {
  // 입력 검증
  if (typeof user_message !== 'string') throw new Error('Invalid input: User Feedback Message');

  // Date 날짜를 YYYY.MM.DD HH:mm:ss 형식으로 반환
  const created_at = moment().tz("Asia/Seoul").format('YYYY.MM.DD HH:mm:ss');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "user_message": user_message,
    "created_at": created_at,
  }

  return API_INSTANCE_WITH_TOKEN.post('/slack/feedback', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}