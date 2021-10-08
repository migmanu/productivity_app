import { useEffect } from 'react'
import StartButton from './StartButton'
import styles from './timer_styles.module.css'

const Pomodoro = (props) => {
    const { counter, setCounter, setMinutes, setSeconds, 
        isActive, setIsActive, pomodoros, setPomodoros, corte, setCorte } = props

    

    useEffect(() => {
        console.log('Pomodoro component useEffect init');
        console.log(`pomodoros is: ${pomodoros}, corte is ${corte}`);

        if (counter === 0 && corte === false && pomodoros < 4) {
            console.log('corte is false. Pomodoro started');
            setMinutes('25')
            setSeconds('00')
            setCounter(1500)
            setCorte(true)
            console.log('pomodoros now is: ', pomodoros);
        }

        if (counter === 0 && corte === true && pomodoros < 3) {
            console.log('corte is true. Break started');
            setPomodoros(pomodoros + 1)
            setMinutes('05')
            setSeconds('00')
            setCounter(300)
            setCorte(false)
        }

        if (counter === 0 && corte === true && pomodoros === 3) {
            console.log('4 pomodoros');
            setPomodoros(pomodoros + 1)
            setMinutes('15')
            setSeconds('00')
            setCounter(900)
            setCorte(false)
            console.log('long break started');
        }

        if (counter === 0 && pomodoros === 4) {
            console.log('pomodoro cycle completed');
            setPomodoros(0)
            setMinutes('25')
            setSeconds('00')
            setCounter(1500)
            setCorte(true)
        }
    }, [isActive])

    const stopTimer = () => {
        setIsActive(false)
        setCounter(1500)
        setMinutes('25')
        setSeconds('00')
    }

    return (
        <div>
            <div className={styles.buttons}>
                <StartButton setIsActive={setIsActive} isActive={isActive} />
                <button onClick={stopTimer} className={styles.reset}>Restart</button>
            </div>
            <span className={styles.pomodoros}>Pomodoros: {pomodoros}</span>
        </div>
    )
}

export default Pomodoro