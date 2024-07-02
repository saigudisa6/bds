import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export interface ChartParams{
  playerData: {
    name: string,
    points?: number,
    ast?: number,
    reb?: number
  }[],
  seasonType: string,
}

export default function BDSBar ({playerData, seasonType} : ChartParams) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={playerData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{fontSize:10}}/>
          <YAxis label={{value: seasonType, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', marginTop: 20, color: 'black' }}}/>
          <Tooltip />
          <Bar 
          dataKey={playerData[0].points ? "points" : playerData[0].reb ? 'reb' : 'ast'} fill="#8884d8" activeBar={<Rectangle fill="green" stroke="blue" />}/>
        </BarChart>
      </ResponsiveContainer>
    );
}
