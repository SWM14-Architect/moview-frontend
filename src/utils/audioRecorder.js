import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { stt_api } from '../api/interview';
import style from "../styles/interviewChat.module.css";
import { useRecoilState } from "recoil";
import { interviewIdAtom } from "../store/interviewRoomAtom";

/**
 * AudioRecorder 컴포넌트
 *
 * 사용자의 음성을 녹음하고 서버로 전송하는 기능을 수행합니다.
 * 이 컴포넌트는 녹음 버튼을 제공합니다.
 *
 * Props:
 * - className: 외부에서 전달하는 클래스명
 * - canNotPlayerSpeaking: 녹음이 가능한 상태인지를 판단하는 함수
 * - onSTTResult: 서버로부터 STT 결과를 받아 처리하는 콜백 함수
 *
 * State:
 * - mediaRecorder: 현재 활성화된 MediaRecorder 인스턴스
 * - interviewId: 현재 인터뷰 ID (Recoil 상태)
 */
export default function AudioRecorder({ className, canNotPlayerSpeaking, onSTTResult }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [interviewId, ] = useRecoilState(interviewIdAtom);

  useEffect(() => {
    return stopMediaRecorderOnUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaRecorder]);

  const stopMediaRecorderOnUnmount = () => {
    if (isMediaRecorderRecording(mediaRecorder)) {
      stopMediaRecorder(mediaRecorder);
    }
  }

  const isMediaRecorderRecording = (recorder) => recorder && recorder.state === 'recording';

  const stopMediaRecorder = (recorder) => {
    recorder.stream.getTracks().forEach(track => track.stop());
    recorder.stop();
  }

  const startRecording = async () => {
    try {
      const audioStream = await getAudioStreamFromMic();
      const activeMediaRecorder = initializeMediaRecorder(audioStream);
      activeMediaRecorder.start();
      setMediaRecorder(activeMediaRecorder);
    } catch (err) {
      handleMicAccessError();
    }
  };

  const getAudioStreamFromMic = () => {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }

  const initializeMediaRecorder = (audioStream) => {
    const activeMediaRecorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });
    let audioDataChunks = [];
    let audioStartTime;

    activeMediaRecorder.ondataavailable = event => audioDataChunks.push(event.data);  // 녹음 중 생성된 데이터 저장
    activeMediaRecorder.onstart = () => audioStartTime = Date.now();  // 짧은 음성 녹음 방지를 위해 녹음 시작 시간 저장
    activeMediaRecorder.onstop = () => handleRecordingStop(audioDataChunks, audioStartTime);

    return activeMediaRecorder;
  }

  const handleRecordingStop = (audioDataChunks, startTime) => {
    const audioBlob = new Blob(audioDataChunks, { type: "audio/webm" });  // 여러 개의 chunk을 하나의 blob으로 변환
    const recordedTime = (Date.now() - startTime) / 1000;

    if (isRecordingLongEnough(recordedTime)) {
      sendAudioToServer(audioBlob);
    } else {
      warnShortRecording();
    }

    setMediaRecorder(null);
  }

  const isRecordingLongEnough = (recordedTime) => recordedTime > 1;

  const sendAudioToServer = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);  // data:audio/webm;base64,실제 데이터
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];  // base64로 인코딩된 데이터 추출
      callSttApi(base64Data);
    }
  }

  const warnShortRecording = () => toast.warn(`답변의 길이가 너무 짧습니다.\n1초 이상 대답해주세요!`, {});

  const handleMicAccessError = () => toast.error(`마이크 접근이 거부되었습니다. 마이크 권한을 허용해주세요.`, {})

  const stopRecording = () => stopMediaRecorder(mediaRecorder);

  const callSttApi = (base64Data) => {
    stt_api({ interview_id: interviewId, audio_data: base64Data })
    .then(res => onSTTResult && onSTTResult(res.message.text))
    .catch(err => toast.error(handleServerError(err)));
  };

  const handleServerError = (err) => {
    return `${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`;
  }

  return (
      <div className={className}>
        <button
            onClick={mediaRecorder ? stopRecording : startRecording}
            className={getButtonClassName()}
            disabled={canNotPlayerSpeaking()}
            aria-label={mediaRecorder ? "녹음 완료" : "녹음 시작"}
        >
        </button>
      </div>
  );

  function getButtonClassName() {
    return `${mediaRecorder ? `${style.input_form_record_button} ${style.start}` : style.input_form_record_button} ${canNotPlayerSpeaking() ? style.input_form_record_disabled : null}`
  }
}