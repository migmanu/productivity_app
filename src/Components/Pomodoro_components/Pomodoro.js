import { useState, useEffect } from 'react'
import StartButton from './StartButton'
import styles from './timer_styles.module.css'
import Timer from './Timer'

const Pomodoro = (props) => {
    const [minutes, setMinutes] = useState('25')
    const [seconds, setSeconds] = useState('00')
    const [isActive, setIsActive] = useState(false)
    const [counter, setCounter] = useState(1500) //used to count passed time in pomodoro cycle
    const [pomodoros, setPomodoros] = useState(0) //used to count number of pomodoro cycles
    const [corte, setCorte] = useState(true) //use to control when on pomodoro and when on break

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
        <div className={styles.container}>
            <div>
                <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} 
                setSeconds={setSeconds} isActive={isActive} 
                setIsActive={setIsActive} counter={counter} setCounter={setCounter} />
            </div>
            <div className={styles.buttons}>
                <StartButton setIsActive={setIsActive} isActive={isActive} />
                <button onClick={stopTimer} className={styles.reset}>Restart</button>
            </div>
            <span className={styles.pomodoros}>Pomodoros: {pomodoros}</span>
        </div>
    )
}

export default Pomodoro