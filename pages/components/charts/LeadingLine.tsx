import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, } from "recharts"
import { combinePlayoffAndRegular } from "@/utils/dataCleaner"
import { findMax } from "@/utils/dataCleaner";

type LeaderLineParams = {
    data?:{
        regData:{
            year: string,
            num: string
        }[] | undefined,
        playoffData?:{
            year: string,
            num: string
        }[] | undefined
    },
    name?: string
}

export default function LeaderLineChart({data, name} : LeaderLineParams) {
    let cleanedData = null;

    window.alert(name)

    if(!data) return(<>Loading...</>)
    cleanedData = combinePlayoffAndRegular(data.regData, data.playoffData)
    let max = findMax(data.regData)
    
    if(name) name = (name.charAt(name.length - 1) == '*') ? name.substring(0, name.length - 1) : name

    return(
        <>
            <LineChart width={950} height={315} data={cleanedData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, Math.floor(max+(max/7))]}  label={{value: name, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', marginTop: 20, color: 'black' }}}/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reg" name="Regular Season (/10)" stroke="#8884d8" />
                <Line type="monotone" dataKey="playoff" name="Playoffs" stroke="#82ca9d" />
            </LineChart>
        </>
    )
}