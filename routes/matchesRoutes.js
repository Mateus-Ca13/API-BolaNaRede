const { Router } = require('express');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { getMatchesListController, getPlayersFromMatchController } = require('../controllers/matchesControllers');
const router = Router();

router.post('/get-list', authenticateToken, getMatchesListController);
router.post('/get-match-players', authenticateToken, getPlayersFromMatchController);

module.exports = router;