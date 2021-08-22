import styles from './timer_styles.module.css'

const StartButton = (props) => {
    const { setIsActive, isActive } = props
    console.log('Button module init. isActive:', isActive);

    if (isActive === true) {
        console.log('isActive is true');
        return (
            <button onClick={() => setIsActive(false)} className={styles.pause}>Pause</button>
        )
    } else {
        console.log('isActive is false');
        return (
            <button onClick={() => setIsActive(true)} className={styles.start}>Start</button>
        )
    }
}

export default StartButton