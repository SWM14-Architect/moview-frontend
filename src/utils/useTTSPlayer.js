import { useEffect } from 'react';
import { tts_api } from '../api/interview';
import {toast} from "react-toastify";

export const useTTSPlayer = (questionContent, onTTSComplete) => {
  useEffect(() => {
    if (typeof questionContent !== 'string') return;

    let audioElement;
    let audioSrc;
    tts_api({
      text: questionContent,
    }).then((res) => {
      // Base64로 인코딩된 문자열을 Blob 객체로 변환
      const byteCharacters = atob(res.message.audio_data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'audio/mp3'});

      // Blob 객체를 Object URL로 변환
      audioSrc = URL.createObjectURL(blob);

      // HTML Audio Element를 생성하여 재생
      audioElement = new Audio(audioSrc);

      // 오디오 재생이 끝났을 때 Object URL 해제 (메모리 누수 방지)
      audioElement.addEventListener('ended', () => {
        URL.revokeObjectURL(audioSrc);
        onTTSComplete();  // TTS가 완료되면 호출
      });

      // 오디오 재생 중 오류가 발생했을 때 Object URL 해제 (메모리 누수 방지)
      audioElement.onerror = function () {
        console.error("Audio error: ", audioElement.error);
        URL.revokeObjectURL(audioSrc);
      };

      audioElement.play();
    }).catch((err) => {
      toast.error(`${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`, {});
      console.error(err);
    });

    return () => {
      if (audioElement) {
        audioElement.pause(); // 오디오 정지
        audioElement.removeEventListener('ended', () => {
          URL.revokeObjectURL(audioSrc);
        }); // 이벤트 리스너 제거
        audioElement.onerror = null; // 에러 핸들러 제거

        if (audioElement.readyState !== 0 && audioElement.src !== '') { // 오디오가 로딩되었는지와 src가 비어있지 않은지 확인
          audioElement.src = ''; // 오디오 소스 제거
          URL.revokeObjectURL(audioSrc); // Object URL 해제
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionContent]);
}
