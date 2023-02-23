import React from 'react';
import './style.css'


const muteToggle = ({ volume, setVolume }) => {
  const handleClick = () => volume ? setVolume(0) : setVolume(1)
  if (!volume) {
    return (
      <button
        className="display__mute"
        id="muteButton"
        title="mute button"
        onClick={handleClick}
      >
        <SvgComponent path={audio.mute} />
        {/* <SvgComponent path={volume ? audio.mute : audio.vol} /> */}
      </button>
    );
  }
    return (
      <button
        className="display__mute"
        id="muteButton"
        title="mute button"
        onClick={handleClick}
      >
        <SvgComponent path={volumeAudio.vol} />
      </button>
    );
  };

export default muteToggle;


const audio = {mute = 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z', vol: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'}

const SvgComponent = (path) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d={path}
  />
</svg>
)