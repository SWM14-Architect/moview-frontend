import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { stt_api } from '../api/interview';
import style from "../styles/interviewChat.module.css";
import {useRecoilState} from "recoil";
import {interviewIdAtom} from "../store/interviewRoomAtom";

export default function AudioRecorder({ className, canNotPlayerSpeaking, onSTTResult }) {
  const [mediaRecorder, setMediaRecorder] = useState(null); // 녹음에 사용될 MediaRecorder 객체를 저장
  const [interviewId, ] = useRecoilState(interviewIdAtom);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 실행될 코드 (여기선 비워둠)

    return (() => {
      // 컴포넌트가 언마운트 될 때 실행될 코드
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        mediaRecorder.stop();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaRecorder]);  // 의존성 배열은 비워두어 컴포넌트 마운트/언마운트 시에만 실행되게 함

  const startRecording = async () => {
    try {
      // 사용자 마이크에 접근 시도
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});

      // MediaRecorder 객체 생성
      const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      // 녹음 중에 데이터가 생성되면 audioChunks에 저장
      let localAudioChunks = [];
      newMediaRecorder.ondataavailable = (event) => {
        localAudioChunks.push(event.data);
      };

      // 녹음이 시작될 때의 타임스탬프 저장 (너무 짧은 음성이 녹음되는 것을 방지하기 위함)
      let audioDuration;
      newMediaRecorder.onstart = () => {
        audioDuration = Date.now();
      };

      newMediaRecorder.onstop = () => {
        // 녹음된 오디오의 길이 측정
        const recordedTime = (Date.now() - audioDuration) / 1000;

        // 녹음된 오디오 데이터를 Blob 객체로 변환
        const blob = new Blob(localAudioChunks, { type: "audio/webm" });

        if (recordedTime > 1) {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            sendDataToServer(base64String);
          };
        } else {
          toast.warn(`답변의 길이가 너무 짧습니다.\n1초 이상 대답해주세요!`, {})
        }

        localAudioChunks = [];  // 녹음된 오디오 데이터 초기화
        setMediaRecorder(null);  // MediaRecorder 객체 초기화
      }

      // 녹음 시작
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
    } catch (err) {
      toast.error(`마이크 접근이 거부되었습니다. 마이크 권한을 허용해주세요.`, {});
    }
  };

  const stopRecording = () => {
    mediaRecorder.stream.getTracks().forEach(track => track.stop()); // 미디어 디바이스에 대한 접근 중지
    mediaRecorder.stop(); // 녹음 중지
  };

  const sendDataToServer = (base64Data) => {
    stt_api({
      interview_id: interviewId,
      audio_data: base64Data,
    }).then((res) => {
      if (onSTTResult) {
        onSTTResult(res.message.text);
      }
    }).catch((err) => {
      toast.error(`${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`, {});
    });
  };

  return (
      <div className={className}>
        <button
            onClick={mediaRecorder ? stopRecording : startRecording}
            className={`${mediaRecorder ? `${style.input_form_record_button} ${style.start}` : style.input_form_record_button} ${canNotPlayerSpeaking() ? style.input_form_record_disabled : null}`}
            disabled={canNotPlayerSpeaking()}
            aria-label={mediaRecorder ? "녹음 완료" : "녹음 시작"}
        >
        </button>
      </div>
  );
}