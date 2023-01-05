import React from 'react'
import './style.css'
const Header = ({ children }) => {
  return(
    <h1 className='header__title'>{children}</h1>
  )
}


export default Header