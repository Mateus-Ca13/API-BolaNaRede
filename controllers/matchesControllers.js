const { getMatchesListService, getPlayersFromMatchService } = require("../services/matchesServices");

const getMatchesListController = async (req, res, next) => {
    try {
        const limit = req.body.limit;
        const offset = req.body.offset;
        const filters = req.body.filters
        const returndata = await getMatchesListService(offset, limit, filters)
        return res.status(200).json(returndata)

    } catch (error) {
        next(error)
    }
   
}

const getPlayersFromMatchController = async (req, res, next) => {
    try {
        const matchId = req.body.matchId;
        const returndata = await getPlayersFromMatchService(matchId);
        return res.status(200).json(returndata)

    }catch (error){
            next(error)
        }
}

module.exports = {getMatchesListController, getPlayersFromMatchController}