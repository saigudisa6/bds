import React,{ useState, useEffect } from "react";
import BDSBar from "../charts/Bar";
import styles from "./Dashboard.module.css"
import { Grid, GridItem, Select } from '@chakra-ui/react'
import { trpc } from "@/utils/trpc";
import { cleanStatsData } from "@/utils/dataCleaner";
import AllTime from "../charts/AllTimeChart";
import LeaderLineChart from "../charts/LeadingLine";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box
  } from '@chakra-ui/react'

interface DashParams{
    stat: string,
    statTitle: string,
    yr: number,
}

function Dashboard({stat, statTitle, yr}: DashParams) {

    const [year, setYear] = useState(yr);
    const [regYr, setRegYr] = useState(yr);
    const options = [15,16,17,18,19,20,21,22,23,24]

    const {data: playoffData, isLoading: isLoadingPlayoff} = trpc.dashboards.getTopPlayers.useQuery({stat: stat, year: year, seasonType: 'Playoffs'})
    const {data: regData, isLoading: isLoadingReg} = trpc.dashboards.getTopPlayers.useQuery({stat: stat, year: regYr, seasonType: 'Regular Season'})

    const cleanedPlayoffData = playoffData ? cleanStatsData(playoffData, stat) : {stat:'pts', playerData:[{name:'sai', numStat: 12332}]}
    const cleanedRegData = regData ? cleanStatsData(regData, stat) : {stat:'pts', playerData:[{name:'sai', numStat: 12332}]}

    const {data:allTimePlayers, isLoading: isLoadingAllTime} = trpc.dashboards.getAllTimePlayers.useQuery({stat: stat})

    const {data: allTimeChart, isLoading: lineChartLoading} = trpc.dashboards.getYearlyStats.useQuery({stat: (stat.toLowerCase())})

    if(isLoadingPlayoff || isLoadingReg || isLoadingAllTime || lineChartLoading){
        return(<div>LOADING...</div>)
    }
    if(!allTimePlayers) return (<div>ERROR LOADING DATA</div>)

    const regularSeasonDisplay = {...cleanedRegData, seasonType: 'Regular Season'}
    const playoffsDisplay = {...cleanedPlayoffData, seasonType: 'Playoffs'}

    const handleYrChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(parseInt(event.target.value))
    }

    const handleRegYrChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegYr(parseInt(event.target.value))
    }

    return(
        <>
            <h1 className={styles.dashTitle}>{statTitle}</h1>

            <Grid
                h='85%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <AllTime allTimePlayers={allTimePlayers}/>
                </GridItem>
                <GridItem colSpan={2}>
                    <BDSBar {...playoffsDisplay}/>
                </GridItem>
                <GridItem colSpan={2}>
                    <BDSBar {...regularSeasonDisplay}/>
                </GridItem>
                <GridItem colSpan={3}>
                    <LeaderLineChart data={allTimeChart} name={allTimePlayers[0].player}/>
                </GridItem>
                <GridItem colSpan={1} className={styles.inputs}>
                    <div className={styles.inputs}>
                        <div style={{width : '75%'}}> Playoffs:</div>
                        <Select iconSize={'0'} placeholder={`20${year-1} - 20${year}`} value={1} onChange={handleYrChange}>
                            {options.map((year, index) => (
                                <option key={index} value={year}>
                                    20{year - 1} - 20{year}
                                </option>
                            ))}
                        </Select>
                        <div style={{width : '75%'}}> Regular Season:</div>
                        
                        <Select iconSize={'0'} placeholder={`20${regYr-1} - 20${regYr}`} value={1} onChange={handleRegYrChange}>
                            {options.map((year, index) => (
                                <option key={index} value={year}>
                                    20{year - 1} - 20{year}
                                </option>
                            ))}
                        </Select>
                    </div>
                </GridItem>
            </Grid>
        </>
        
    )
}

export default Dashboard;