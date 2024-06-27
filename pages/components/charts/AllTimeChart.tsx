import { Accordion, AccordionItem, StylesProvider } from "@chakra-ui/react"
import styles from './AllTimeCharts.module.css'
import { all } from "axios"

export interface allTimePlayersParams{
    allTimePlayers: {
        rank: string,
        player: string,
        numStat: string
    }[] | undefined
}

export default function AllTime({allTimePlayers} : allTimePlayersParams){

    const cleanName = (name: string) : string => {
        if(name.charAt(name.length - 1) == '*')
            return name.substring(0, name.length - 1);
        else
            return name
    }

    if(allTimePlayers) allTimePlayers.map((player) => {
        if (player.player)
            player.player = cleanName(player.player)
    })
    console.log(allTimePlayers)

    return(
        <>
            <div className={styles.title}>All time Leaders</div>
            <Accordion>  
            <AccordionItem>
                {allTimePlayers ? allTimePlayers.map((currPlayer, index) => {
                        return (
                            <div key={currPlayer.rank || index} className={styles.playerCont}>
                                <div>{currPlayer.player}</div>
                                <div className={styles.stat}>{currPlayer.numStat}</div>
                            </div>
                        )
                    }) : (<div>ERRROR</div>)}
            </AccordionItem>
            </Accordion>
        </>
    )
}