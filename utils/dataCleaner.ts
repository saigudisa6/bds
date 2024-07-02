import { trpc } from "./trpc"
import { ChartParams } from "@/pages/components/charts/Bar"

type CleanedReturn = {
    playerData:{
        name: string,
        points?: number,
        ast?: number,
        reb?: number
    }[]
}

export function cleanStatsData(data: any, stat: string) : CleanedReturn{
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
                reb: data.resultSet.rowSet[i][18]
            }
            fullData.push(currPlayer)
        }
        if(stat === 'AST'){
            const currPlayer = {
                name: data.resultSet.rowSet[i][2],
                ast: data.resultSet.rowSet[i][19]
            }
            fullData.push(currPlayer)
        }  
    }
    return {playerData: fullData}
}

export function combinePlayoffAndRegular(regData: any, playoffData: any) {
    const cleanedData : {year: string, reg: string, playoff: string}[] = []
    let j = 0;
    for(let i = 0; i < regData.length; i++){
        if(j < playoffData.length && regData[i].year.substring(regData[i].year.length - 2) === playoffData[j].year.substring(playoffData[j].year.length - 2)){
            cleanedData.push({
                year: regData[i].year,
                reg: regData[i].num,
                playoff: playoffData[j++].num
            })  
        } else {
            cleanedData.push({
                year: regData[i].year,
                reg: regData[i].num,
                playoff: '0'
            }) 
        }
        
    }

    return cleanedData
}

export function findMax(data: any){
    let max = 0

    data.forEach((el:any) => {max = Math.max(max, el.num)})
    return max;
}