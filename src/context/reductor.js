export const TOGGLE_SETTINGS_VISIBILITY = 'TOGGLE_SETTINGS_VISIBILITY';
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_BUTTON_TEXT = 'SET_BUTTON_TEXT';
export const SET_SECONDS_LEFT = 'SET_SECONDS_LEFT';
export const FINISHED_TIMER = 'FINISHED_TIMER';
export const CHANGE_TIMER_MODE = 'CHANGE_TIMER_MODE';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const APPLY_SETTINGS = 'APPLY_SETTINGS';

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_VISIBILITY:
      return { ...state, settingsVisible: !state.settingsVisible };
    case SET_ACTIVE:
      return { ...state, isActive: action.payload.isActive };
    case SET_BUTTON_TEXT:
      return { ...state, buttonText: action.payload.buttonText };
    case SET_SECONDS_LEFT:
      return { ...state, secondsLeft: action.payload.secondsLeft };
    case FINISHED_TIMER:
      return { ...state, isActive: false, buttonText: '' };
    case CHANGE_TIMER_MODE:
      return {
        ...state,
        timerMode: action.payload.timerMode,
        isActive: false,
        buttonText: 'Comenzar',
        secondsLeft: state[action.payload.timerMode + 'Length'] * 60,
      };
    case CHANGE_ACTIVE:
      if (action.payload.timeLeft === '0:00') {
        return state;
      }
      const text = ['Comenzar', 'Reanudar'].includes(state.buttonText)
        ? 'Pausa'
        : 'Reanudar';
      return { ...state, isActive: !state.isActive, buttonText: text };
    case APPLY_SETTINGS:
      return {
        ...state,
        ...action.payload.values,
        secondsLeft: state[action.payload.values.timerMode + 'Length'] * 60,
      };
    default:
      return state;
  }
};


export default reducer

const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.isActive) return;
    const interval = setInterval(() => {
      dispatch({
        type: SET_SECONDS_LEFT,
        payload: { secondsLeft: state.secondsLeft - 1 },
      });
    }, 1000);

    if (state.secondsLeft === 0) {
      clearInterval(interval);
      dispatch({ type: FINISHED_TIMER });
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.secondsLeft]);

  const timersLength = {
    pomo: state.pomoLength,
    short: state.shortLength,
    long: state.longLength,
  };

  const toggleSettingsVisibility = () => {
    dispatch({ type: TOGGLE_SETTINGS_VISIBILITY });
  };

  const changeTimerMode = ({ timerMode }) => {
    dispatch({ type: CHANGE_TIMER_MODE, payload: { timerMode } });
  };

  const changeActive = () => {
    dispatch({
      type: CHANGE_ACTIVE,
      payload: { timerLeft: formatTimeLeft(state.secondsLeft) },
    });
  };

  const applySettings = ({ values }) => {
    dispatch({ type: APPLY_SETTINGS, payload: { values } });
    changeStyle({ font: values.fontPref, color: values.accentColor });
  };

  const calcPercentage = () =>
    (state.secondsLeft / (state[state.timerMode + 'Length'] * 60)) * 100;

  return (
    <CounterContext.Provider
      value={{
        ...state,
        changeTimerMode,
        percentage: calcPercentage(),
        timeleft: formatTimeLeft(state.secondsLeft),
        changeActive,
        timersLength,
        applySettings,
        toggleSettingsVisibility,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
