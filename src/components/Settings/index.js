import React from 'react';
import './style.css'
import useCounter from '../../hooks/useCounter';
import Button from '../Button';

const Settings = () => {
  const { settingsVisible, fontPref, accentColor, timerMode, pomoLength, shortLength, longLength, applySettings } = useCounter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const values = Object.fromEntries(formData.entries());
    values['timerLength'] = values[`${timerMode}Length`];
    applySettings({ values });
  }

    return (
      <div className={`preferences ${settingsVisible ? 'preferences--visible' : ''}`}>
      <div className="preferences__pane">
        <Button type="close" buttonText="×" />
        <h2>Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="pane__time-settings">
            <h3>Time (Minutes)</h3>
              <label htmlFor="pomodoro">Pomodoro</label>
              <input type="number" name="pomoLength" id="pomodoro" min="5" max="90" defaultValue={pomoLength} />
              <label htmlFor="short-break">Short break</label>
              <input type="number" name="shortLength" id="short-break" min="1" max="14" defaultValue={shortLength} />
              <label htmlFor="long-break">Long break</label>
              <input type="number" name="longLength" id="long-break" min="15" max="30" defaultValue={longLength} />
          </div>

          <div className="pane__font-preference">
            <h3>Font</h3>
            <input type="radio" id="fontPref1" name="fontPref" value="kumbh" defaultChecked={fontPref === 'kumbh'} />
            <label htmlFor="fontPref1" className="font-preference__kumbh">Aa</label>
            <input type="radio" id="fontPref2" name="fontPref" value="roboto" defaultChecked={fontPref === 'roboto'} />
            <label htmlFor="fontPref2" className="font-preference__roboto">Aa</label>
            <input type="radio" id="fontPref3" name="fontPref" value="space" defaultChecked={fontPref === 'space'} />
            <label htmlFor="fontPref3" className="font-preference__space">Aa</label>
          </div>

          <div className="pane__color-preference">
            <h3>Color</h3>
            <input type="radio" id="colorPref1" name="accentColor" value="default" defaultChecked={accentColor === 'default'} />
            <label htmlFor="colorPref1" className="color-preference__default"></label>

            <input type="radio" id="colorPref2" name="accentColor" value="blue" defaultChecked={accentColor === 'blue'} />
            <label htmlFor="colorPref2" className="color-preference__blue"></label>
            
            <input type="radio" id="colorPref3" name="accentColor" value="purple" defaultChecked={accentColor === 'purple'} />
            <label htmlFor="colorPref3" className="color-preference__purple"></label>
          </div>
          <Button type="apply" buttonText="Apply" />
        </form>
      </div>
    </div>
    )
  
}

export default Settings