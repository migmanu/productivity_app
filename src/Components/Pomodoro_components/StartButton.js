import styles from './timer_styles.module.css'
import startIcon from '../../Icons/play.svg'
import pauseIcon from '../../Icons/pause.svg'

const StartButton = (props) => {
  const { setIsActive, isActive } = props

  if (isActive === true) {
    return (
      <input type="image" src={pauseIcon} onClick={() => setIsActive(false)} className={styles.icon}></input>
    )
  } else if (isActive === false) {
    return (
      <input type="image" src={startIcon} onClick={() => setIsActive(true)} className={styles.icon}></input>
    )
  }
}

export default StartButton
