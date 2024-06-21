import styles from './Dashboards.module.css';
import Header from "./components/header/Header"
import Dashboard from './components/dashboard/Dashboard';
import { trpc } from '../utils/trpc';

export default function Dashboards() {
    
    return(
        <div>
            <Header/>
            <div className={styles.dashBody}>
                <Dashboard statTitle='POINTS (Player)' stat='PTS' yr={24} />
            </div>
        </div>
    )
}