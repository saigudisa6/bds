import styles from './Header.module.css'
import Link from 'next/link'

export default function Header(){
    return(
        <div className={styles.headerContainer}>
            <div className={styles.left}>
                <a>Basketball Dashboards & Stories</a>
            </div>
            <div className={styles.right}>
                <Link className={styles.link} href='/dashboards'>Dashboards</Link>
                <a>Stories</a>
                <a>About</a>
            </div>
        </div>
    )
}