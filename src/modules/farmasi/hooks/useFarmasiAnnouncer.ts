import { useEffect, useRef, useState } from 'react';
import { FarmasiQueueTicket } from '../types';

export const useFarmasiAnnouncer = (currentQueue: FarmasiQueueTicket | null) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const lastAnnouncedName = useRef<string | null>(null);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const willBeEnabled = !prev;
      
      // Browser hack to "unlock" audio features on user click
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
        
        // If turning on, we might want to announce the current one immediately if it hasn't been announced
        if (currentQueue && currentQueue.name !== lastAnnouncedName.current) {
          announce(currentQueue);
        }
      }
      
      return willBeEnabled;
    });
  };

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

  const announce = async (queue: FarmasiQueueTicket) => {
    if (!isSoundEnabled) return;
    
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any current speech

        const doSpeak = () => {
          let pronouncedQueueNumber = queue.queue_number;
          // Strip leading zeros from numbers (e.g. "0005" -> "5", "A0012" -> "A12")
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/\d+/g, (match) => parseInt(match, 10).toString());
          // Add space between letter and number (e.g. "A12" -> "A 12")
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(\d)/g, '$1 $2');
          // Space out consecutive letters so they are spelled out (e.g. "AB" -> "A B")
          pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(?=[a-zA-Z])/g, '$1 ');
          
          const text = `Antrian nomor, ${pronouncedQueueNumber}. Atas nama, ${queue.patient_name}. Silakan menuju ke, ${queue.handed_counter || 'Loket Farmasi'}.`;
          
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'id-ID';
          utterance.rate = 0.85; // Slightly slower for clarity
          utterance.pitch = 1;
          
          // Find Indonesian voice if available
          const voices = window.speechSynthesis.getVoices();
          const idVoice = voices.find(v => v.lang.includes('id'));
          if (idVoice) {
            utterance.voice = idVoice;
          }

          window.speechSynthesis.speak(utterance);
        };

        try {
          await playChime();
        } catch (e) {
          console.error('Failed to play chime audio:', e);
          setIsSoundEnabled(false);
        }
        
        doSpeak();
      }
    } catch (err) {
      console.error('Audio announcement failed:', err);
    }
    
    lastAnnouncedName.current = queue.name;
  };

  useEffect(() => {
    // Only announce if sound is enabled and there is a new "Dipanggil" queue that we haven't announced yet
    if (isSoundEnabled && currentQueue && currentQueue.name !== lastAnnouncedName.current) {
      announce(currentQueue);
    }
  }, [currentQueue, isSoundEnabled]);

  return { isSoundEnabled, toggleSound };
};
