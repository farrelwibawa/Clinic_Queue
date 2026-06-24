import { useEffect, useRef, useState } from 'react';
import { PoliGigiQueueTicket } from '../types';

export const usePoliGigiAnnouncer = (currentQueue: PoliGigiQueueTicket | null) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const lastAnnouncedModified = useRef<string | null>(null);

  const playChime = async () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    };

    // Ting-Tong sound
    playTone(659.25, 0, 1);    // E5
    playTone(523.25, 0.4, 1.5); // C5

    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const announce = async (queue: PoliGigiQueueTicket) => {
    if (!isSoundEnabled) return;
    
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any current speech

        const doSpeak = () => {
          let pronouncedQueueNumber = queue.queue_number;
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/\d+/g, (match) => parseInt(match, 10).toString());
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(\d)/g, '$1 $2');
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(?=[a-zA-Z])/g, '$1 ');
          
          const text = `Antrian nomor, ${pronouncedQueueNumber}. Atas nama, ${queue.patient_name}. Silakan menuju ke, ${queue.clinic_room}.`;
          
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
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          ctx.resume();
        }
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance('');
          u.volume = 0;
          window.speechSynthesis.speak(u);
        }
      }
      
      return willBeEnabled;
    });
  };

  return { isSoundEnabled, toggleSound };
};
