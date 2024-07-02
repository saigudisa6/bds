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

const getYearlyStatsSchema = z.object({
    stat: z.string()
})

type GetTopPlayersInput = z.TypeOf<typeof getTopPlayerStatsSchema>;
type GetAllTimePlayersInput = z.TypeOf<typeof getAllTimePlayersSchema>;
type GetYearlyStats = z.TypeOf<typeof getYearlyStatsSchema>;

const getTopPlayersController = async (input: GetTopPlayersInput) => {
    const stat = input.stat;
    const year = input.year;
    const seasonType = input.seasonType;

    const res = await axios.get(`https://stats.nba.com/stats/leagueleaders?ActiveFlag=&LeagueID=00&PerMode=Totals&Scope=S&Season=20${year-1}-${year}&SeasonType=${seasonType}&StatCategory=${stat}`)
    return res.data;
}

const getAllTimePlayersController =  async (input: GetAllTimePlayersInput) => {
    
    if(input.stat === 'REB' || input.stat === 'reb') input.stat = 'TRB'
    let fullStat = ''
    switch(input.stat) {
        case 'PTS': fullStat='points'; break;
        case 'TRB': fullStat='rebounds'; break;
        case 'AST': fullStat='assists'; break;
    }

    const {data} = await axios.get(`https://www.landofbasketball.com/all_time_leaders/${fullStat}_total_career_season.htm`)
    const $ = cheerio.load(data)
    
    const players : {rank:string, player: string, numStat: string}[] = [];
    $('tbody tr').each((index, element) => {
        const rank = $(element).find('td').eq(0).text().trim();
        const player = $(element).find('td').eq(1).text().trim();
        const numStat = $(element).find('td').eq(2).text().trim();
        
        players.push({ rank, player, numStat });
    });
    return players.slice(1,11)
}

const getYearlyStatsController = async (input: GetYearlyStats) => {
    let fullName = ''
    await getAllTimePlayersController({stat: input.stat}).then(data => {
        fullName = data[0].player
    })
    console.log(fullName)
    if(fullName) fullName = (fullName.charAt(fullName.length - 1) == '*') ? fullName.substring(0, fullName.length - 1) : fullName
    fullName = fullName.split(' ').map(el => el.toLowerCase()).join('_')
    

    const {data} = await axios.get(`https://www.landofbasketball.com/nba_players_stats/${fullName}.htm`)
    const $ = cheerio.load(data)

    const regData : {year: string, num: string}[] = [];
    const playoffData : {year: string, num: string}[] = [];

    let statIdx = 0;

    switch (input.stat) {
        case 'pts': statIdx = 4; break;
        case 'reb': statIdx = 7; break;
        case 'ast': statIdx = 8; break;
    }

    const careerTotals = {};
    $('table.tbl-stats:eq(1) tr').each((index, element) : void => {
        const row = $(element).find('td');
        if (row.length > 0) {
            const yr = $(row[0]).text().trim();
            if(yr.length <= 0 || (yr.charAt(0) != '2' && yr.charAt(0) != '1')) return;
            const num = $(row[statIdx]).text().trim()
            regData.push({
                year: yr,
                num: num
            })
        }
    });

    $('table.tbl-stats:eq(2) tr').each((index, element) : void => {
        const row = $(element).find('td');
        if (row.length > 0) {
            const yr = $(row[0]).text().trim();
            if(yr.length <= 0 || (yr.charAt(0) != '2' && yr.charAt(0) != '1')) return;
            const num = $(row[statIdx]).text().trim()
            console.log(num)
            playoffData.push({
                year: yr,
                num: num
            })
        }
    });

    return {regData: regData, playoffData: playoffData}

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
    
        getYearlyStats: publicProcedure
            .input(getYearlyStatsSchema)
            .query(async ({input}) => {
                const data = await getYearlyStatsController(input)
                return data
            })
})