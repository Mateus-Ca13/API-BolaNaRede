const { errorResponse, successResponse } = require('../utils/responseHandler');
const supabase = require('../utils/supabaseClient');

const getMatchesListService = async (offset, limit, filters)=> {

    if(offset == undefined || offset == null || limit == undefined || limit == null ){
        throw errorResponse(400, 'Os campos de offset e limit são obrigatórios.')
    }

    console.log(`offset ${offset}, limit ${limit}, filters ${filters}`)

     //Verificar se existem partidas 
    let getMatchesQuery = supabase.from('MATCHES').select('*');

    if(filters?.search && filters.search != ''){
        getMatchesQuery = getMatchesQuery.eq('average_age', filters.average_age)
    
     }
    if(filters?.average_age && filters.average_age != 'NDA'){
    getMatchesQuery = getMatchesQuery.eq('average_age', filters.average_age)
    
    }
    if(filters?.price && filters.price != 'NDA'){
    getMatchesQuery = getMatchesQuery.eq('price', filters.price)
    
    }
    if(filters?.gamestyle && filters.gamestyle != 'NDA'){
    getMatchesQuery = getMatchesQuery.eq('gamestyle', filters.gamestyle)
    
    }
    if(filters?.gamemode && filters.gamemode != 'NDA'){
    getMatchesQuery = getMatchesQuery.eq('gamemode', filters.gamemode)
    
    }


    const { data: existingMatches, error: findError } = await getMatchesQuery.range(offset, offset + limit - 1);

     if (findError) {
        throw errorResponse(400, 'Erro ao verificar partidas. Tente novamente mais tarde.');
    }
    
    return successResponse(200, "Busca por partidas foi feita com sucesso", {existingMatches: existingMatches})
    
}

const getPlayersFromMatchService = async (matchId)=> {
    
    const { data: playersList, error: findError } = await supabase
    .from('MATCHES_USERS')
    .select('position, user:player_id (username)')
    .eq('match_id', matchId)

    if (findError) {
        throw errorResponse(400, 'Erro ao buscar jogadores da partida. Tente novamente mais tarde.');
    }

    return successResponse(200, `Busca por jogadores foi feita com sucesso na partida ${matchId}`, {matchPlayers: playersList})
}

module.exports = { getMatchesListService, getPlayersFromMatchService }