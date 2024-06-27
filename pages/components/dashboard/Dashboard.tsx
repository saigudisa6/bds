import React,{ useState, useEffect } from "react";
import BDSBar from "../charts/Bar";
import styles from "./Dashboard.module.css"
import { Grid, GridItem } from '@chakra-ui/react'
import { trpc } from "@/utils/trpc";
import { cleanStatsData } from "@/utils/dataCleaner";
import AllTime from "../charts/AllTimeChart";
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

    if(isLoadingPlayoff || isLoadingReg || isLoadingAllTime){
        return(<div>LOADING...</div>)
    }
    // const regData = trpc.dashboards.getTopPlayers.useQuery({stat: 'PTS', year: 22, seasonType: 'Regular Season'}).data
    // const cleanedRegData = cleanStatsData(regData)
    return(
        <>
            <h1 className={styles.dashTitle}>{statTitle}</h1>

            <Grid
                h='100%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <AllTime allTimePlayers={allTimePlayers}/>
                </GridItem>
                <GridItem colSpan={2}>
                    <BDSBar {...cleanedPlayoffData} />
                </GridItem>
                <GridItem colSpan={2}>
                    <BDSBar {...cleanedRegData}/>
                </GridItem>
                <GridItem colSpan={4} />
            </Grid>
        </>
        
    )
}

export default Dashboard;