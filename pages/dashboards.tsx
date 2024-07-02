import styles from './Dashboards.module.css';
import Header from "./components/header/Header"
import Dashboard from './components/dashboard/Dashboard';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { trpc } from '../utils/trpc';

export default function Dashboards() {
    
    return(
        <div>
            <Header/>

            <Tabs variant='soft-rounded' colorScheme='green' className={styles.tabs}>
                <TabList className={styles.tablist}>
                    <Tab className={styles.tab}>Points (Player)</Tab>
                    <Tab className={styles.tab}>Rebounds (Player)</Tab>
                    <Tab className={styles.tab}>Assists (Player)</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <div className={styles.dashBody}>
                            <Dashboard statTitle='POINTS (Player)' stat='PTS' yr={24} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.dashBody}>
                            <Dashboard statTitle='REBOUNDS (Player)' stat='REB' yr={24} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.dashBody}>
                            <Dashboard statTitle='ASSISTS (Player)' stat='AST' yr={24} />
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}