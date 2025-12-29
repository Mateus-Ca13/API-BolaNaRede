const { errorResponse } = require('../utils/responseHandler');
const supabase = require('../utils/supabaseClient');

const checkExistingUser = async (usermail) => {

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
    return existingUser;
}

module.exports = checkExistingUser;