import React from 'react';
import './style.css';

import useCounter from '../../hooks/useCounter';

const Header = () => {
  const { timerMode } = useCounter();
  return <h1 className="header__title">{timerMode}</h1>;
};

export default Header;
