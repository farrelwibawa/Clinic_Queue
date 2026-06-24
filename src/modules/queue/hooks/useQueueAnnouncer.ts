import { useEffect, useRef, useState } from 'react';
import { QueueTicket } from '../types';

export const useQueueAnnouncer = (currentQueue: QueueTicket | null) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const lastAnnouncedName = useRef<string | null>(null);

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

  const announce = async (queue: QueueTicket) => {
    if (!isSoundEnabled) return;
    
    try {
      await playChime();

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any current speech

        // Format queue number for natural reading
        // "0012" -> "12", "P0012" -> "P 12", "AB005" -> "A B 5"
        let pronouncedQueueNumber = queue.queue_number.replace(/\d+/g, (match) => parseInt(match, 10).toString());
        // Add spaces between letters and numbers
        pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(\d)/g, '$1 $2');
        // Space out consecutive letters so they are spelled out
        pronouncedQueueNumber = pronouncedQueueNumber.replace(/([a-zA-Z])(?=[a-zA-Z])/g, '$1 ');
        
        const text = `Antrian nomor, ${pronouncedQueueNumber}. Atas nama, ${queue.patient}. Silakan menuju ke, ${queue.destination_clinic}.`;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.85; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0; // Max volume

        // Try to pick a female Indonesian voice if available
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(v => 
          v.lang.includes('id') && (v.name.toLowerCase().includes('female') || v.name.includes('Gadis') || v.name.includes('Google'))
        ) || voices.find(v => v.lang.includes('id'));
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Audio announcement failed:', err);
    }
  };

  useEffect(() => {
    // If we have a current queue, and it's different from the last one we announced
    if (currentQueue && currentQueue.name !== lastAnnouncedName.current) {
      lastAnnouncedName.current = currentQueue.name;
      announce(currentQueue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQueue, isSoundEnabled]);

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
      }
      
      return willBeEnabled;
    });
  };

  return { isSoundEnabled, toggleSound };
};
