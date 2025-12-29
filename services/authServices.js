const bcrypt = require('bcrypt');
const supabase = require('../utils/supabaseClient');
const jwt = require("jsonwebtoken");
const { sendVerificationEmailToken } = require('../utils/emailToken');
const { errorResponse, successResponse } = require('../utils/responseHandler');
const saltRounds = 10;
require("dotenv").config();

//=====================================================================================================================

const checkExistingUserService = async (email, username) => {

    const { data: existingUser, error: findError } = await supabase
        .from('USERS')
        .select('id, email, username')
        .or(`email.eq.${email},username.eq.${username}`)
        .limit(1)
        .single();


    if (existingUser) {
        if(email == existingUser.email){
            throw errorResponse(409,'Este email já está sendo utilizado.');
        }else if(username == existingUser.username){
            throw errorResponse(409,'Este apelido já está sendo utilizado.');
        }else{
            throw errorResponse(409,'Este usuário já existe.');
        }
        
    }
    if (findError && findError.code != "PGRST116") {
        throw errorResponse(400, 'Erro ao verificar o usuário. Tente novamente mais tarde.');
    }

    if(!existingUser){
        return successResponse(200, "Nenhum usuário cadastrado com as credenciais informadas", {})
    }
}

//=====================================================================================================================

const sendEmailTokenService = async (userEmail, token, createdAt, expiresAt) => {

    if (!userEmail || !token || !createdAt || !expiresAt) {
        throw errorResponse(400, "Todos os campos são obrigatórios")
        
      }

    if(!userEmail.includes('@') || !userEmail.includes('.') || userEmail.length <= 6){
        throw errorResponse(400, 'O email enviado é inválido!')
    }

    // Puxa na tabela e verifica se o último token foi cadastrado a menos de 15min
    // Se SIM => Reenvia o mesmo código pelo email e não é feito um novo insert na tabela.
    const { data: activeVerification, error: findError } = await supabase
    .from('EMAIL_VERIFICATIONS')
    .select('token')
    .eq('email', userEmail)
    .gte('expires_at', new Date().toISOString())
    .limit(1)
    .single();

    if(activeVerification == null){ 
        
        const { data: data, error: error } = await supabase
        .from('EMAIL_VERIFICATIONS') 
        .insert([
            { email: userEmail, token: token, created_at: createdAt, expires_at: expiresAt }
        ]);

        if(error){
            console.error('Erro ao cadastrar código de verificação:', error);
            throw errorResponse(500, 'Erro ao cadastrar código de verificação no banco de dados.');
        }else{
            console.log(data)
            console.log("código enviado: "+ token)
        }
    }else{
        //Pega o mesmo token e reenvia pro email do usuário
        token = activeVerification.token;
        console.log(activeVerification)
        console.log("mesmo código enviado: "+ token)
    }
    // Envia email com o token
    await sendVerificationEmailToken(userEmail, token)
    return successResponse(200, "Código de verificação enviado com sucesso", {})
}

//=====================================================================================================================

const verifyEmailTokenService = async (userEmail, token) => {

    if(!userEmail){
        throw errorResponse(400, 'Todos os campos são obrigatórios.')
    }

    const { data: data, error: findError } = await supabase
    .from('EMAIL_VERIFICATIONS')
    .select('token')
    .eq('email', userEmail)
    .gte('expires_at', new Date().toISOString())
    .limit(1)
    .single();

    if(data){
        if(data.token == token){
           return successResponse(200, "Email autenticado com sucesso.", {})
        }else{
            throw errorResponse(400 ,"Os tokens não conferem.")
        }
    }if(findError){
        throw errorResponse(400, "Não foi possível encontrar um registro de token válido.")
    }
}

//=====================================================================================================================

const registerService = async (accountName, username, email, password, birthDate, gamestyle, gender, favoritePosition) => {

    if (!accountName || !username || !email || !password || !favoritePosition || !gamestyle || !birthDate || !gender) {
        throw errorResponse(400, 'Todos os campos são obrigatórios.');
      }

    //Verificar se o usuário já existe
    const { data: existingUser, error: findError } = await supabase
        .from('USERS')
        .select('id')
        .eq('email', email)
        .limit(1)
        .single();

    if (existingUser) {
        throw errorResponse(409,'Este email já está registrado.');
    }
    if (findError && findError.code != "PGRST116") {
        throw errorResponse(400, 'Erro ao verificar o usuário. Tente novamente mais tarde.');
    }

    if(!existingUser){
        // Caso não encontre o usuário, crie uma hash e registre no banco de dados
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const { data: newUser, error: insertError } = await supabase
        .from('USERS')
        .insert([
            {
                username: username,
                name: accountName,
                email: email,
                password_hash: passwordHash, 
                favorite_position: favoritePosition,
                gender: gender,
                birthdate: birthDate,
                gamestyle: gamestyle,
                created_at: new Date()
            }
        ]);

        if (insertError) {
        throw errorResponse(400, 'Erro ao cadastrar o usuário. Tente novamente mais tarde.');
        
        }

        return successResponse(201, "Usuário cadastrado com sucesso.", {})
    }
    

}

//=====================================================================================================================

const loginService = async (email, password)=> {

    if(!password || !email){
        throw new Error('Todos os campos são obrigatórios.')
    }

     //Verificar se o usuário já existe
     const { data: existingUser, error: findError } = await supabase
     .from('USERS')
     .select('password_hash, username')
     .eq('email', email)
     .limit(1)
     .single();

     console.log(existingUser)

     if (findError) {
        throw errorResponse(500, 'Erro ao verificar o usuário. Tente novamente mais tarde');
    }
    
    if (existingUser) {
        let correctPassword = await bcrypt.compare(password, existingUser.password_hash)
        

    if (!process.env.JWT_SECRET) {
        throw errorResponse(500, "Erro interno: chave JWT não configurada.")
        }           

        if(correctPassword){
            let token = jwt.sign({sub: existingUser.username, email: email}, process.env.JWT_SECRET, {expiresIn: "7d"})
            return successResponse(200, "Conta autenticada com sucesso.", {token: token})
        }else{
            throw errorResponse(400, "Credenciais de acesso inválidas.")
        }
        
    }
    else if(!existingUser){
        throw errorResponse(400, 'Credenciais de acesso inválidas.');
    }
    
}

//=====================================================================================================================


module.exports = { checkExistingUserService, sendEmailTokenService, verifyEmailTokenService, registerService, loginService }