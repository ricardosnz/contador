import { useSelector, useDispatch } from 'react-redux';

import {
  toggleSettingsVisibility,
  setSecondsLeft,
  finishedTimer,
  changeTimerMode,
  changeActive,
  applySettings,
} from './counterReducer';

const useCounter = () => {
  const state = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.isActive) return;
    const interval = setInterval(() => {
      dispatch(setSecondsLeft({ secondsLeft: state.secondsLeft - 1 }));
    }, 1000);

    if (state.secondsLeft === 0) {
      clearInterval(interval);
      dispatch(finishedTimer());
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.secondsLeft]);

  const timersLength = {
    pomo: state.pomoLength,
    short: state.shortLength,
    long: state.longLength,
  };

  const toggleSettingsVisibility = () => {
    dispatch(toggleSettingsVisibility());
  };

  const changeTimerMode = ({ timerMode }) => {
    dispatch(changeTimerMode({ timerMode }));
  };

  const changeActive = (timerLeft) => {
    dispatch(changeActive({ timerLeft }));
  };

  const applySettings = ({ values }) => {
    dispatch(applySettings({ values }));
    changeStyle({ font: values.fontPref, color: values.accentColor });
  };

  const calcPercentage = () =>
    (state.secondsLeft / (state[state.timerMode + 'Length'] * 60)) * 100;

  return {
    ...state,
    changeTimerMode,
    percentage: calcPercentage(),
    timeLeft: formatTimeLeft(state.secondsLeft),
    changeActive,
    timersLength,
    applySettings,
    toggleSettingsVisibility,
  };
};

export default useCounter;
