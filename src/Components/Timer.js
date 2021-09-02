import { useEffect } from 'react';
import styles from './timer_styles.module.css'

/* 
Simple timer component used following this tutorial: 
https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2

To-do: look into comment suggesting optimization 

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
                const secondCounter = counter % 60 - 1;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
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