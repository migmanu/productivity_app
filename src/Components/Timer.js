import { log } from 'loglevel';
import react, { useEffect } from 'react';
import styles from './timer_styles.module.css'

/* 
Simple timer component used following this tutorial: 
https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2
*/

const Timer = (props) => {
    const { minutes, setMinutes, seconds, setSeconds, isActive, setIsActive, counter, setCounter } = props
    console.log(isActive);
    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSeconds(computedSecond)
                setMinutes(computedMinute)

                setCounter(counter => counter + 1)
            }, 1000)
        }

        return () => clearInterval(intervalId)
    }, [isActive, counter])

    const stopTimer = () => {
        setIsActive(false)
        setCounter(0)
        setSeconds('00')
        setMinutes('00')
    }

    return (
        <div className={styles.container}>
            <div className={styles.time}>
                <span className={styles.minute}>{minutes}</span>
                <span>:</span>
                <span className={styles.second}>{seconds}</span>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => setIsActive(!isActive)} className={styles.start}>Start</button>
                <button onClick={stopTimer} className={styles.reset}>Reset</button>
            </div>
        </div>
    )
}

export default Timer