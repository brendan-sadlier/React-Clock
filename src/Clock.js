import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone';

function TimeApp() {
    const [timezone, setTimezone] = useState('UTC');
    const [time, setTime] = useState(moment().tz(timezone).format('HH:mm:ss'));
    const [date, setDate] = useState(moment().tz(timezone).format('DD/MM/YYYY'));

    const [isDarkMode, setIsDarkMode] = useState(false);

    function handleDarkModeToggle() {
      setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().tz(timezone).format('HH:mm:ss'));
            setDate(moment().tz(timezone).format('DD/MM/YYYY'));
        }, 1);
        return () => clearInterval(interval);
    }, [timezone]);

    const handleChange = (e) => {
        setTimezone(e.target.value);
    };

    const timezones = moment.tz.names();

    return (
      <div className={isDarkMode ? "App dark" : "App"}>
            <button className='btn primary-btn mt-2' onClick={handleDarkModeToggle}>
              {isDarkMode ? "Light" : "Dark"}
            </button>
        <div className="container">
          <div className="row">
            <div className="text-center mt-4">
              <h4>Current Time</h4>
              <h1 className='time'>{time}</h1>
              <h5>{date}</h5>
            </div>
            <div className="text-center mt-5">
              <p>Time Zone</p>
              <select value={timezone} onChange={handleChange}>
                {timezones.map(timezone => (
                    <option key={timezone} value={timezone}>{timezone}</option>
                ))}
              </select>
            </div>
          </div>

          </div>
        </div>
      );
}

export default TimeApp