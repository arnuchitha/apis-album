const jwt = require('jsonwebtoken');
const mod_errorMessage = require('../core/err-message');

const getTokenFromHeaders = async (req) =>{
    const token = req.body.token || req.query.token || req.headers['auth-token'];
    return token
}

const checkTokenCurrent = async (token) => {
    const verified =  jwt.verify(token,global.ENV.APP_VERIFY);
    const currentTokenUse = (verified.executiveAppPass == global.ENV.APP_VERIFY)
    if(!currentTokenUse) return false;
    return currentTokenUse;
}  

module.exports = async (req,res,next) => {
    // const errCode = new mod_errorMessage();
    // const token = await getTokenFromHeaders(req);
    // if(!token) return res.status(401).send(errCode.errorMessageTo(false, 401,  'Unauthorized', 'Verify', 'Access Denied'));
    // try{  
    //     const chkTk = await checkTokenCurrent(token);
    //     if(!chkTk) return res.status(401).send(errCode.errorMessageTo(false, 401,  'Unauthorized', 'Verify', 'incorrect auth-token!! '));
    //     next();
    // }catch(err){
    //     res.status(400).send(errCode.errorMessageTo(false, 400,  'Bad Request', 'Verify', 'Invalid Token !!'));
    // }   
}

