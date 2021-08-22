import styles from './timer_styles.module.css'

const StartButton = (props) => {
    const { setIsActive, isActive } = props

    if (isActive === true) {
        return (
            <button onClick={() => setIsActive(false)} className={styles.pause}>Pause</button>
        )
    } else if (isActive === false) {
        return (
            <button onClick={() => setIsActive(true)} className={styles.start}>Start</button>
        )
    }
}

export default StartButton