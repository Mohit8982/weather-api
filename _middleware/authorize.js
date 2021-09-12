const jwt = require('jsonwebtoken');


exports.verify_request = async (req, res, next) => {
    try
    {
        const token  = req.header('authorization');
        if(token){
            const verify = jwt.verify(token, process.env.secret);
            req.auth = verify;
            next();
        }
        else{
            return res.json({
                status: 2,
                msgType: 'error',
                message: 'Access Denied, Sorry you are not authorised to use this service'
            });
        }
    }
    catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};