import React, { useState } from 'react';

const Colors = ({ accentColor }) => (
  <>
    {['default', 'blue', 'purple'].map((color, index) => (
      <>
        <input
          type="radio"
          id={`colorPref${index + 1}`}
          name="color"
          value={color}
          defaultChecked={accentColor === color}
        />
        <label
          htmlFor={`colorPref${index + 1}`}
          className={`color-preference__${color}`}
        ></label>
      </>
    ))}
  </>
);

const Fonts = ({ fontPref }) => (
  <>
    {['kumbh', 'roboto', 'space'].map((font, index) => (
      <>
        <input
          type="radio"
          id={`fontPref${index + 1}`}
          name="font"
          value={font}
          defaultChecked={fontPref === font}
        />
        <label
          htmlFor={`fontPref${index + 1}`}
          className={`font-preference__${font}`}
        >
          Aa
        </label>
      </>
    ))}
  </>
);

const Times = ({}) => (
<>
  
</>)
export { Colors, Fonts };
