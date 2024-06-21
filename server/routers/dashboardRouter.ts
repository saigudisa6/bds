import {z} from 'zod'
import { router, publicProcedure } from '../trpc';
import axios from 'axios';

const getTopPlayerStatsSchema = z.object({
    stat: z.string(),
    year: z.number(),
    seasonType: z.string(),
})

type GetTopPlayersInput = z.TypeOf<typeof getTopPlayerStatsSchema>;

const getTopPlayersController = async (input: GetTopPlayersInput) => {
    const stat = input.stat;
    const year = input.year;
    const seasonType = input.seasonType;

    const res = await axios.get(`https://stats.nba.com/stats/leagueleaders?ActiveFlag=&LeagueID=00&PerMode=Totals&Scope=S&Season=20${year-1}-${year}&SeasonType=${seasonType}&StatCategory=${stat}`)
    console.log(res.data)
    return res.data;
}

export const dashboardRouter = router({
    getTopPlayers: publicProcedure
        .input(getTopPlayerStatsSchema)
        .query(async ({input}) => {
            const data = await getTopPlayersController(input)
            return data
        })
})