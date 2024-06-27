import styles from './Main.module.css'
import Link from 'next/link'

export default function MainPage(){
    return(
        <div className={styles.welcomeContainer}>
            <div className={styles.top}>
                <div className={styles.welcomeMsg}>Welcome to BD&S!</div>
                <div>Click to view daily-updated dashboards or ML-fueled basketball stories!</div>
            </div>
            <div className={styles.bottom}>
                <button className={styles.welcomeBtn}><Link className={styles.link} href='/dashboards'>Dashboards</Link></button>
                <button className={styles.welcomeBtn}>Stories</button>
            </div>
        </div>
    )
}