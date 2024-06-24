import React, { useState, useRef, useEffect } from 'react';

function JobDescriptionEdm({Description}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [voiceLoaded, setVoiceLoaded] = useState(false);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      setVoiceLoaded(true);
    };

    // Check if speech synthesis is available
    if (!synth) {
      console.error('Speech synthesis not supported.');
      return;
    }

    // Fetch voices
    fetchVoices();

    // Update voices on voice change
    synth.onvoiceschanged = fetchVoices;

    return () => {
      // Clean up voice change listener
      synth.onvoiceschanged = null;
    };
  }, [synth]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const text = document.getElementById('document-content').innerText.trim();

      // Stop current speech if it's speaking
      if (synth.speaking && utteranceRef.current) {
        synth.cancel(utteranceRef.current);
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice to the first available voice
      if (voices.length > 0) {
        utterance.voice = voices[0]; // Use the first available voice
      } else {
        console.warn('No voices available.');
      }

      synth.speak(utterance);
      utteranceRef.current = utterance;
    } else {
      synth.pause();
    }
  };

  if (!voiceLoaded) {
    return <div>Loading voices...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg space-y-6">
        <div id="document-content" className="w-full">
          <h1 className="text-2xl font-bold text-black mb-4">Required JAVA Backend Developer</h1>
          <ul className="text-black space-y-2 mb-4">
            <li>Min 3 years Experience required</li>
            <li>Salary up to 11 Lac per annum</li>
            <li>Work from office @ Baner Pune</li>
            <li>Day Shift Job 6 Days Working</li>
          </ul>
          <div className="mt-4">
            <p className="text-black font-bold">For Details</p>
            <p className="text-black">Call Swapnil 9970730641</p>
            <p className="text-blue-500">swapnil@157ipl.com</p>
          </div>
          <div className="w-full flex justify-end">
            <img
              className="min-w-20 h-auto transform scale-x-[-1]"
              src="https://media1.giphy.com/media/de5yu652vsARnyh5x3/200w.gif?cid=6c09b952g48fre99ochi4qlkcprx1pct3gp43i0bnacin6ku&ep=v1_gifs_search&rid=200w.gif&ct=g"
              alt=""
            />
          </div>
        </div>
        <button
          onClick={togglePlay}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}

export default JobDescriptionEdm;