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
    const {data: playoffData, isLoading: isLoadingPlayoff} = trpc.dashboards.getTopPlayers.useQuery({stat: stat, year: yr, seasonType: 'Playoffs'})
    const {data: regData, isLoading: isLoadingReg} = trpc.dashboards.getTopPlayers.useQuery({stat: stat, year: yr, seasonType: 'Regular Season'})

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

    return(
        <>
            <h1 className={styles.dashTitle}>{statTitle}</h1>

            <Grid
                h='85%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg={'tomato'}>
                    <AllTime allTimePlayers={allTimePlayers}/>
                </GridItem>
                <GridItem colSpan={2} bg={'tomato'}>
                    <BDSBar {...playoffsDisplay}/>
                </GridItem>
                <GridItem colSpan={2} bg={'tomato'}>
                    <BDSBar {...regularSeasonDisplay}/>
                </GridItem>
                <GridItem colSpan={3} bg={'tomato'}>
                    <LeaderLineChart data={allTimeChart} name={allTimePlayers[0].player}/>
                </GridItem>
                <GridItem colSpan={1} bg={'tomato'} className={styles.inputs}>
                    <div style={{backgroundColor : 'blue'}}>
                        Playoffs:
                        <Select variant='outline' placeholder='Outline' />
                    </div>
                    <div style={{backgroundColor : 'blue'}}>
                        2
                    </div>
                    <div style={{backgroundColor : 'blue'}}>
                        3
                    </div>
                </GridItem>
            </Grid>
        </>
        
    )
}

export default Dashboard;