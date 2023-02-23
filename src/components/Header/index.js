import React from 'react';
import './style.css';

import useCounter from '../../hooks/useCounter';

import { useSelector, useDispatch } from 'react-redux';

import {
  toggleSettingsVisibility,
  setSecondsLeft,
  finishedTimer,
  changeTimerMode,
  changeActive,
  applySettings,
} from '../../counter/counterReducer';

const Header = () => {
  const estado = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const [activo, setActivo] = React.useState(false);

  React.useEffect(() => {
    const values = {accentColor: "blue",fontPref: "roboto",longLength: "19",pomoLength: "22",shortLength: "1",timerLength: "22"}
    dispatch(applySettings({values}));
  }, [activo]);
  const handleActivo = () => setActivo(!activo);

  const { timerMode } = useCounter();
  return (
    <h1 className="header__title" onClick={handleActivo}>
      {timerMode}
    </h1>
  );
};

export default Header;
