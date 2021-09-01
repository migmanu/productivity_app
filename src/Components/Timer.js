import react, { useEffect } from 'react';

import styles from './timer_styles.module.css'

/* 
Simple timer component used following this tutorial: 
https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2

To-do: look into comment suggesting optimization 
*/

const Timer = (props) => {
    const { minutes, setMinutes, seconds, setSeconds, isActive, 
        counter, setCounter, pomodoros, setPomodoros } = props
    console.log(isActive);
    useEffect(() => {
        let pomodoroCycle
        console.log('pomodoros: ', pomodoros);

        if (isActive === true && counter > 0) {
            pomodoroCycle = setInterval(() => {
                const secondCounter = counter % 60 - 1;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSeconds(computedSecond)
                setMinutes(computedMinute)
                console.log('counter is: ', counter); 

                setCounter(counter - 1)
            }, 1000)
        }
        
        if (counter === 0) {
            console.log('counter is zero');
            setPomodoros(pomodoros + 1)
            console.log('pomodoros now is: ', pomodoros + 1);
            
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