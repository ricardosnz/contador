import React, { useState } from 'react';
import './style.css';
import Button from '../components/Button';

import { Colors, Fonts } from './Colors';

const textTranform = (str) => {
  let [first, ...rest] = str.split(' ');
  return {
    kebab: str.split(' ').join('-'),
    camel: `${first}${rest
      .map((elem) => elem[0].toUpperCase() + elem.substring(1))
      .join('')}`,
  };
};

import useCounter from '../hooks/useCounter';

const Settings = () => {
  const {
    settingsVisible,
    fontPref,
    accentColor,
    timersLength,
    timerMode,
    applySettings,
    toggleSettingsVisibility,
  } = useCounter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const values = Object.fromEntries(formData.entries());
    values['timerMode'] = timerMode;
    console.log(values[timerMode + 'Length'])
    // state[action.payload.values.timerMode + 'Length'] * 60
    applySettings({ values });
    toggleSettingsVisibility();
  };

  return (
    <div
      className={`preferences ${
        settingsVisible ? 'preferences--visible' : ''
      } `}
    >
      <div className="preferences__pane">
        <Button
          type="close"
          buttonText="×"
          toggleVisibility={toggleSettingsVisibility}
        />
        <h2>Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="pane__time-settings">
            <h3>Time (Minutes)</h3>
            <label htmlFor="pomodoro">Pomodoro</label>
            <input
              type="number"
              name="pomoLength"
              id="pomodoro"
              min="5"
              max="90"
              defaultValue={timersLength.pomo}
            />
            <label htmlFor="short-break">Short break</label>
            <input
              type="number"
              name="shortLength"
              id="short-break"
              min="1"
              max="14"
              defaultValue={timersLength.short}
            />
            <label htmlFor="long-break">Long break</label>
            <input
              type="number"
              name="longLength"
              id="long-break"
              min="15"
              max="30"
              defaultValue={timersLength.long}
            />
          </div>

          <div className="pane__font-preference">
            <h3>Font</h3>
            <input
              type="radio"
              id="fontPref1"
              name="fontPref"
              value="kumbh"
              defaultChecked={fontPref === 'kumbh'}
            />
            <label htmlFor="fontPref1" className="font-preference__kumbh">
              Aa
            </label>
            <input
              type="radio"
              id="fontPref2"
              name="fontPref"
              value="roboto"
              defaultChecked={fontPref === 'roboto'}
            />
            <label htmlFor="fontPref2" className="font-preference__roboto">
              Aa
            </label>
            <input
              type="radio"
              id="fontPref3"
              name="fontPref"
              value="space"
              defaultChecked={fontPref === 'space'}
            />
            <label htmlFor="fontPref3" className="font-preference__space">
              Aa
            </label>
          </div>

          <div className="pane__color-preference">
            <h3>Color</h3>
            <input
              type="radio"
              id="colorPref1"
              name="accentColor"
              value="default"
              defaultChecked={accentColor === 'default'}
            />
            <label
              htmlFor="colorPref1"
              className="color-preference__default"
            ></label>

            <input
              type="radio"
              id="colorPref2"
              name="accentColor"
              value="blue"
              defaultChecked={accentColor === 'blue'}
            />
            <label
              htmlFor="colorPref2"
              className="color-preference__blue"
            ></label>

            <input
              type="radio"
              id="colorPref3"
              name="accentColor"
              value="purple"
              defaultChecked={accentColor === 'purple'}
            />
            <label
              htmlFor="colorPref3"
              className="color-preference__purple"
            ></label>
          </div>
          <Button type="apply" buttonText="Apply" />
        </form>
      </div>
    </div>
  );
};
export default Settings;

const applySettingsss = (event) => {
  event.preventDefault();
  const { target } = event;
  const { pomodoro, shortBreak, longBreak, font, color } = target;

  setPomoLength(pomodoro.value);
  setShortLength(shortBreak.value);
  setLongLength(longBreak.value);

  setFontPref(font.value);
  setAccentColor(color.value);
  toggleSettingsVisibility();

  styles.setProperty('--font-current', fonts[font.value]);
  styles.setProperty('--accent-color', colors[color.value]);

  setSecondsLeft(timersLength[timerMode] * 60);
};

const setting = () => {
  const panel = {
    time: [
      {
        title: 'Pomodoro',
        id: 'pomodoro',
        name: 'pomodoro',
        min: '5',
        max: '90',
        defaultValue: pomoLength,
      },
      {
        title: 'Short break',
        id: 'short-break',
        name: 'shortBreak',
        min: '1',
        max: '14',
        defaultValue: shortLength,
      },
      {
        title: 'Long break',
        id: 'long-break',
        name: 'longBreak',
        min: '15',
        max: '30',
        defaultValue: longLength,
      },
    ],
    font: [
      { id: 'fontPref1', name: 'kumbh', class: 'font-preference__kumbh' },
      { id: 'fontPref2', name: 'roboto', class: 'font-preference__roboto' },
      { id: 'fontPref3', name: 'space', class: 'font-preference__space' },
    ],
    color: [
      { id: 'colorPref1', name: 'default', class: 'color-preference__default' },
      { id: 'colorPref2', name: 'blue', class: 'color-preference__blue' },
      { id: 'colorPref3', name: 'purple', class: 'color-preference__purple' },
    ],
  };

  const time = [
    { name: 'pomodoro', min: '5', max: '90', defaultValue: pomoLength },
    { name: 'short break', min: '1', max: '14', defaultValue: shortLength },
    { name: 'long break', min: '15', max: '30', defaultValue: longLength },
  ];
  const color = [
    { id: 'colorPref1', name: 'default' },
    { id: 'colorPref2', name: 'blue' },
    { id: 'colorPref3', name: 'purple' },
  ];
  const inputsSetting = {
    time: [
      {
        name: 'pomodoro',
        id: 'pomodoro',
        min: '5',
        max: '90',
        default: timersLength.pomo,
      },
      {
        name: 'shortBreak',
        id: 'short-break',
        min: '1',
        max: '14',
        default: timersLength.short,
      },
      {
        name: 'longBreak',
        id: 'long-break',
        min: '15',
        max: '30',
        default: timersLength.long,
      },
    ],
  };

  if (!visible) {
    return (
      <div className="preferences preferences--visible">
        <div className="preferences__pane">
          <Button
            type="close"
            buttonText="×"
            toggleVisibility={toggleSettingsVisibility}
          />
          <h2>Settings</h2>
          <form onSubmit={applySettings}>
            {Object.entries(panel).map(([key, values]) => {
              return values.map(
                ({ id, value, clase, defaultValue, label, min, max }) => (
                  <div className={`pane__${key}-preference`}>
                    <h3>
                      {key}
                      {key === 'time' && ' (MINUTES)'}
                    </h3>
                    {key === 'time' ? (
                      <div>
                        <input
                          type="number"
                          name={value}
                          min={min}
                          max={max}
                          defaultValue={defaultValue}
                        />
                        <label>{label}</label>
                      </div>
                    ) : (
                      <>
                        <input
                          type="radio"
                          id={id}
                          name={key}
                          value={value}
                          defaultChecked={[accentColor, fontPrefvalue].includes(
                            value
                          )}
                        />
                        <label htmlFor={id} className={clase}>
                          {key === 'color' && 'Aa'}
                        </label>
                      </>
                    )}
                  </div>
                )
              );
            })}
          </form>
        </div>
      </div>
    );
  }
};
