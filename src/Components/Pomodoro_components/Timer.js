import { useEffect } from 'react';
import styles from './timer_styles.module.css'

/* 
Simple timer component used following this tutorial: 

Uses serInterval every second to countdown from initial time set in minutes and seconds states.
When counter reaches zero, adds 1 to pomodoro cycle counter. 
Displays time counter and buttons.

*/

const Timer = (props) => {
  const { minutes, setMinutes, seconds, setSeconds, isActive, setIsActive,
    counter, setCounter } = props
  useEffect(() => {
    let pomodoroCycle

    if (isActive === true && counter > 0) {
      pomodoroCycle = setInterval(() => {
        let secondCounter = counter % 60 - 1;
        let minuteCounter = Math.floor(counter / 60);
        console.log('secondCounter is: ', secondCounter);
        console.log('counter is: ', counter);

        /* 
        The following if statement is needed in order to prevent the first 
        second of the Timer to show '-1' within still the same minute and 
        then jump to '58' in the following minute
        */
        let computedSecond = 0
        if (String(secondCounter).length === 1) {
          computedSecond = `0${secondCounter}`
        } else if (secondCounter === -1) {
          computedSecond = 59
          minuteCounter = Math.floor((counter - 1) / 60)
        } else {
          computedSecond = secondCounter
        }

        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setSeconds(computedSecond)
        setMinutes(computedMinute)

        setCounter(counter - 1)
      }, 1000)
    } else if (counter === 0) {
      console.log(`counter is zero, isActive set to false`);
      setIsActive(false)

    }



    return () => clearInterval(pomodoroCycle)
  }, [isActive, counter])

  return (

    <div className={styles.time}>
      <span className={styles.minute}>{minutes}</span>
      <span>:</span>
      <span className={styles.second}>{seconds}</span>
    </div>

  )
}

export default Timer
