const { sendEmailTokenService, verifyEmailTokenService, registerService, loginService, getUserService, checkExistingUserService } = require("../services/authServices");
const { emailTokenGenerator } = require("../utils/emailToken");
const { errorResponse, successResponse } = require("../utils/responseHandler");


// =========================================================================

const checkExistingUserController = async (req, res, next) => {
    try{
        const userEmail = req.body.email;
        const username = req.body.username;
        const returndata = await checkExistingUserService(userEmail, username)
        res.status(200).json(returndata)
    }catch(error){
        next(error)
    }
    
}

// =========================================================================

const sendEmailTokenController = async (req, res, next) => {
    try {
        
        const userEmail = req.body.email;
        const token = emailTokenGenerator();
        const createdAt = new Date();
        let expiresAt = new Date()
        expiresAt.setMinutes(expiresAt.getMinutes() + 15);

        if(!userEmail || !token){
            throw errorResponse(400," Não foi possível criar o código de verificação.")
        }
        
        const returndata = await sendEmailTokenService(userEmail, token, createdAt, expiresAt)
        res.status(200).json(returndata)
    } catch (error) {
        next(error)
    }
};

// =========================================================================

const verifyEmailTokenController = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const token = req.body.token;
       const returndata = await verifyEmailTokenService(userEmail, token)
       return res.status(200).send(returndata);
    } catch (error) {
        next(error)}
};

// =========================================================================

const registerController = async (req, res, next) => {
    try {
        const accountName = req.body.accountName;
        const username = req.body.username;
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const birthDate = req.body.birthDate;
        const gamestyle = req.body.gamestyle;
        const gender = req.body.gender;
        const favoritePosition = req.body.favoritePosition;
        const returndata = await registerService(accountName, username, email, password, birthDate, gamestyle, gender, favoritePosition)
        res.status(201).json(returndata)
        
    } catch (error) {
        next(error)
    }
   
}

// =========================================================================

const loginController = async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        let returndata = await loginService(email, password)
        return res.status(200).json(returndata)
    } catch (error) {
        next(error)
    }
}
// =========================================================================


module.exports = { checkExistingUserController, registerController, loginController, sendEmailTokenController, verifyEmailTokenController}