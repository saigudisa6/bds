import { trpc } from "./trpc"

interface StatsData{
    stat:string,
    playerData: 
        {
            name: string,
            numStat: number
        }[]
}

export function cleanStatsData(data: any) : StatsData{
    const fullData = []
    for(let i = 0; i < 5; i++){
        const currPlayer = {
            name: data.resultSet.rowSet[i][2],
            numStat: data.resultSet.rowSet[i][24]
        }
        fullData.push(currPlayer)
    }
    return {stat: 'Playoff Points', playerData: fullData}
}