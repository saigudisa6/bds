import { trpc } from "./trpc"
import { ChartParams } from "@/pages/components/charts/Bar"

export function cleanStatsData(data: any, stat: string) : ChartParams{
    const fullData = []
    for(let i = 0; i < 5; i++){

        if(stat === 'PTS'){
            const currPlayer = {
                name: data.resultSet.rowSet[i][2],
                points: data.resultSet.rowSet[i][24]
            }
            fullData.push(currPlayer)
        }
        if(stat === 'REB'){
            const currPlayer = {
                name: data.resultSet.rowSet[i][2],
                points: data.resultSet.rowSet[i][18]
            }
            fullData.push(currPlayer)
        }
        if(stat === 'AST'){
            const currPlayer = {
                name: data.resultSet.rowSet[i][2],
                points: data.resultSet.rowSet[i][19]
            }
            fullData.push(currPlayer)
        }  
    }
    return {stat: 'Playoff Points', playerData: fullData}
}