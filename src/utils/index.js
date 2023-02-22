export const changeStyle = ({ font, color }) => {
  const colors = { default: '#F87070', blue: '#70F3F8', purple: '#D881F8' };
  const fonts = {
    kumbh: `'Kumbh Sans', sans-serif`,
    roboto: `'Roboto Slab', serif`,
    space: `'Space Mono', monospace`,
  };
  const { style } = document.documentElement;
  style.setProperty('--font-current', fonts[font]);
  style.setProperty('--accent-color', colors[color]);
};

// let formatSecondsToText = {timeText: "24:52", timeLeft: "24:52"}
export const formatTimeLeft = (seconds) =>
`${Math.floor(seconds / 60)}:${
  seconds % 60 > 9 ? seconds % 60 : '0' + (seconds % 60)
}`;