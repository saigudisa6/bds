import styles from './Header.module.css'
import Link from 'next/link'

export default function Header(){
    return(
        <div className={styles.headerContainer}>
            <div className={styles.left}>
                <Link className={styles.link} href='/'>Basketball Dashboards & Stories</Link>
            </div>
            <div className={styles.right}>
                <Link className={styles.link} href='/dashboards'>Dashboards</Link>
                <Link className={styles.link} href='/stories'>Stories</Link>
                <Link className={styles.link}href='/about'>About</Link>
            </div>
        </div>
    )
}