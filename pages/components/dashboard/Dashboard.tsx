import React,{ useState, useEffect } from "react";
import BDSBar from "../charts/Bar";
import styles from "./Dashboard.module.css"
import { Grid, GridItem } from '@chakra-ui/react'
import { trpc } from "@/utils/trpc";
import { cleanStatsData } from "@/utils/dataCleaner";

interface DashParams{
    stat: string,
    statTitle: string,
    yr: number,
}

function Dashboard({stat, statTitle, yr}: DashParams) {
    console.log(yr)
    const {data: playoffData, isLoading: isLoadingPlayoff} = trpc.dashboards.getTopPlayers.useQuery({stat: stat, year: yr, seasonType: 'Playoffs'})
    const {data: regData, isLoading: isLoadingReg} = trpc.dashboards.getTopPlayers.useQuery({stat: stat, year: yr, seasonType: 'Regular Season'})

    const cleanedPlayoffData = playoffData ? cleanStatsData(playoffData) : {stat:'pts', playerData:[{name:'sai', numStat: 12332}]}
    const cleanedRegData = regData ? cleanStatsData(regData) : {stat:'pts', playerData:[{name:'sai', numStat: 12332}]}

    if(isLoadingPlayoff || isLoadingReg){
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
                <GridItem rowSpan={2} colSpan={1} bg='tomato'></GridItem>
                <GridItem colSpan={2} bg='papayawhip'>
                    <BDSBar {...cleanedPlayoffData} />
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip'>
                    <BDSBar {...cleanedRegData}/>
                </GridItem>
                <GridItem colSpan={4} bg='tomato' />
            </Grid>
        </>
        
    )
}

export default Dashboard;