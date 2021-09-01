import { useEffect } from 'react'
import StartButton from './StartButton'
import styles from './timer_styles.module.css'

const Pomodoro = (props) => {
    const { setCounter, setMinutes, setSeconds, isActive, setIsActive, pomodoros, setPomodoros } = props
    
    useEffect(() => {
        if (pomodoros)

    }, [pomodoros])


    const stopTimer = () => {
        setIsActive(false)
        setCounter(5)
        setMinutes('25')
        setSeconds('00')
    }

    return (
        <div className={styles.buttons}>
            <StartButton setIsActive={setIsActive} isActive={isActive} />
            <button onClick={stopTimer} className={styles.reset}>Restart</button>
        </div>
    )
}

export default Pomodoro