import {z} from 'zod'
import { router, publicProcedure } from '../trpc';
import axios from 'axios';
import * as cheerio from 'cheerio'

const getTopPlayerStatsSchema = z.object({
    stat: z.string(),
    year: z.number(),
    seasonType: z.string(),
})

const getAllTimePlayersSchema = z.object({
    stat: z.string()
})

type GetTopPlayersInput = z.TypeOf<typeof getTopPlayerStatsSchema>;
type GetAllTimePlayersInput = z.TypeOf<typeof getAllTimePlayersSchema>;

const getTopPlayersController = async (input: GetTopPlayersInput) => {
    const stat = input.stat;
    const year = input.year;
    const seasonType = input.seasonType;

    const res = await axios.get(`https://stats.nba.com/stats/leagueleaders?ActiveFlag=&LeagueID=00&PerMode=Totals&Scope=S&Season=20${year-1}-${year}&SeasonType=${seasonType}&StatCategory=${stat}`)
    return res.data;
}

const getAllTimePlayersController =  async (input: GetAllTimePlayersInput) => {
    if(input.stat === 'REB') input.stat = 'TRB'
    const {data} = await axios.get(`https://www.basketball-reference.com/leaders/${input.stat.toLowerCase()}_career.html`)
    const $ = cheerio.load(data)

    const players : {rank:string, player: string, numStat: string}[] = [];

    $('#div_nba #nba tbody tr').each((index, element) => {
        const rank = $(element).find('td').eq(0).text().trim();
        const player = $(element).find('td').eq(1).text().trim();
        const numStat = $(element).find('td').eq(2).text().trim();
        
        players.push({ rank, player, numStat });
    });
    return players.slice(0,10)
}

export const dashboardRouter = router({
    getTopPlayers: publicProcedure
        .input(getTopPlayerStatsSchema)
        .query(async ({input}) => {
            const data = await getTopPlayersController(input)
            return data
        }),

    getAllTimePlayers: publicProcedure
        .input(getAllTimePlayersSchema)
        .query(async ({input}) => {
            const data = await getAllTimePlayersController(input)
            return data
        }),
})