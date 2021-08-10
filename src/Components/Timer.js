import react from 'react';
import styles from './timer_styles.module.css'

/* 
Simple timer component used following this tutorial: 
https://dev.to/emmaadesile/build-a-timer-using-react-hooks-3he2
*/

const Timer = (props) => {
    const { minutes, seconds, isActive, setIsActive, counter, setCounter } = props

    return (
        <div className={styles.container}>
            <div className={styles.time}>
                <span className={styles.minute}>{minutes}</span>
                <span>:</span>
                <span className={styles.second}>{seconds}</span>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => setIsActive(true)} className={styles.start}>Start</button>
                <button>Reset</button>
            </div>
        </div>
    )
}

export default Timer