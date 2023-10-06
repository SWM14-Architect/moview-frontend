import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { stt_api } from '../api/interview';
import style from "../styles/interviewChat.module.css";

export default function AudioRecorder({ className, canNotPlayerSpeaking, onSTTResult }) {
  const [mediaRecorder, setMediaRecorder] = useState(null); // 녹음에 사용될 MediaRecorder 객체를 저장
  const [audioDuration, setAudioDuration] = useState(0); // 녹음이 시작된 시간을 저장
  const [micAccessDenied, setMicAccessDenied] = useState(false); // 마이크 접근 권한이 없는지 여부를 저장

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 실행될 코드 (여기선 비워둠)

    return () => {
      // 컴포넌트가 언마운트 될 때 실행될 코드
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // 의존성 배열은 비워두어 컴포넌트 마운트/언마운트 시에만 실행되게 함

  const startRecording = async () => {
    try {
      // 사용자 마이크에 접근 시도
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});

      // MediaRecorder 객체 생성
      const newMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      setAudioDuration(0);

      // 녹음 중에 데이터가 생성되면 audioChunks에 저장
      let localAudioChunks = [];
      newMediaRecorder.ondataavailable = (event) => {
        localAudioChunks.push(event.data);
      };

      // 녹음이 시작될 때의 타임스탬프 저장 (너무 짧은 음성이 녹음되는 것을 방지하기 위함)
      newMediaRecorder.onstart = () => {
        setAudioDuration(Date.now());
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
      setMicAccessDenied(false);  // 마이크 접근이 성공하면 상태를 false로 설정
    } catch (err) {
      console.error("마이크 접근이 거부되었습니다.", err);
      setMicAccessDenied(true);  // 마이크 접근이 거부되면 상태를 true로 설정
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop(); // 녹음 중지
    mediaRecorder.stream.getTracks().forEach(track => track.stop()); // 미디어 디바이스에 대한 접근 중지
  };

  const sendDataToServer = (base64Data) => {
    stt_api({
      audio_data: base64Data,
    }).then((res) => {
      if (onSTTResult) {
        onSTTResult(res.message.text);
      }
    }).catch((err) => {
      toast.warn(`${err.response.data.message.error}`);
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
        {micAccessDenied && (
            <div>
              <p>마이크 접근이 거부되었습니다. 설정을 변경하려면 아래 버튼을 클릭하세요.</p>
              <button onClick={startRecording}>다시 시도</button>
            </div>
        )}
      </div>
  );
}