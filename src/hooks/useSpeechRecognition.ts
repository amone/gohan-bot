import { useState, useEffect, useCallback } from 'react';

// Web Speech APIの型定義
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// 音声認識イベントの型定義
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Web Speech APIのサポート確認
  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = isSupported ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) {
      setError('お使いのブラウザは音声認識をサポートしていません');
      return;
    }

    // 音声認識の設定
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ja-JP';

    // 音声認識開始時の処理
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    // 音声認識結果の処理
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0];
      const transcript = result[0].transcript;
      setTranscript(transcript);
    };

    // 音声認識終了時の処理
    recognition.onend = () => {
      setIsListening(false);
    };

    // エラー処理
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      switch (event.error) {
        case 'no-speech':
          setError('音声が検出されませんでした');
          break;
        case 'audio-capture':
          setError('マイクへのアクセスができません');
          break;
        case 'not-allowed':
          setError('マイクの使用が許可されていません');
          break;
        default:
          setError('音声認識でエラーが発生しました');
      }
    };

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [recognition]);

  const startListening = useCallback(() => {
    if (!recognition) {
      setError('お使いのブラウザは音声認識をサポートしていません');
      return;
    }

    try {
      setTranscript('');
      setError(null);
      recognition.start();
    } catch (err) {
      setError('音声認識の開始に失敗しました');
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error
  };
}; 