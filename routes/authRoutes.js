const { Router } = require('express');
const { loginController, registerController, sendEmailTokenController, verifyEmailTokenController, checkExistingUserController } = require('../controllers/authControllers');

const router = Router();

router.post('/check-existing-user', checkExistingUserController)

router.post('/login', loginController);

router.post('/send-email-token', sendEmailTokenController);

router.post('/email-token-verify', verifyEmailTokenController);

router.post('/register', registerController);

//router.post('/test', )

router.post('/refresh-token', (req, res)=>{res.send("rota de refresh do token")});

module.exports = router