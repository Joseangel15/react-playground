'use client';

import { useRef } from "react";

export default function SoundManager() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const playRef = useRef<HTMLButtonElement>(null);
    const pauseRef = useRef<HTMLButtonElement>(null);
    const stopRef = useRef<HTMLButtonElement>(null);

  function handleOnVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    audioRef.current!.volume = Number(e.target.value) / 100;
  }

  function handlePlayButton() {
    audioRef.current!.play();
  };

  function handlePauseButton() {
    audioRef.current!.pause();
  };

  function handleStopButton() {
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
  };

  return (
    <div>
      <h1 className="text-center text-3xl mt-5 mb-14">Sound Manager</h1>
      <div className="flex justify-center mb-14">
        <audio ref={audioRef} controls preload="auto">
          <source src="/media/cascade-breathe-future-garage-412839.mp3" />
        </audio>
      </div>
      <div className="flex justify-center gap-2.5 mb-4">
        <button ref={playRef} onClick={handlePlayButton} className="border rounded-2xl p-3 cursor-pointer">Play</button>
        <button ref={pauseRef} onClick={handlePauseButton} className="border rounded-2xl p-3 cursor-pointer">Pause</button>
        <button ref={stopRef} onClick={handleStopButton} className="border rounded-2xl p-3 cursor-pointer">Stop</button>
      </div>
      <div className="flex justify-center">
        <input type="range" min="0" max="100" onChange={handleOnVolumeChange} />
      </div>
    </div>
  );
}
