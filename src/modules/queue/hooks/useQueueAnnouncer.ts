import { useEffect, useRef, useState } from 'react';
import { QueueTicket } from '../types';
import { playChime, unlockAudioAndSpeech } from '../../shared/utils/audio';

export const useQueueAnnouncer = (currentQueue: QueueTicket | null) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const lastAnnouncedModified = useRef<string | null>(null);

  const announce = async (queue: QueueTicket) => {
    if (!isSoundEnabled) return;
    
    try {
      await playChime();

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any current speech

        const doSpeak = () => {
          let pronouncedQueueNumber = queue.queue_number;
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/\d+/g, (match) => parseInt(match, 10).toString());
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(\d)/g, '$1 $2');
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(?=[a-zA-Z])/g, '$1 ');
          
          const text = `Antrian nomor, ${pronouncedQueueNumber}. Atas nama, ${queue.patient}. Silakan menuju ke, Loket Registrasi.`;
          
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'id-ID';
          utterance.rate = 0.85; 
          utterance.pitch = 1;
          
          const voices = window.speechSynthesis.getVoices();
          const idVoice = voices.find(v => v.lang.includes('id'));
          if (idVoice) {
            utterance.voice = idVoice;
          }

          window.speechSynthesis.speak(utterance);
        };

          doSpeak();
      }
    } catch (err) {
      console.error('Audio announcement failed:', err);
    }
  };

  useEffect(() => {
    // If we have a current queue, and it's different from the last one we announced
    if (currentQueue && currentQueue.modified !== lastAnnouncedModified.current) {
      lastAnnouncedModified.current = currentQueue.modified;
      announce(currentQueue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQueue, isSoundEnabled]);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const willBeEnabled = !prev;
      
      if (willBeEnabled) {
        unlockAudioAndSpeech();
      }
      
      return willBeEnabled;
    });
  };

  return { isSoundEnabled, toggleSound };
};
