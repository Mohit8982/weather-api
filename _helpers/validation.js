const { body, validationResult } = require('express-validator');

exports.user_Validation = () => {
    return [
        body('username').not().isEmpty().withMessage('Username Cannot Be Empty').isLength({ min: 4, max: 10 }).withMessage('Username Should Atleast Contain Min 4 & Max 10 Character').trim(),
        body('password', 'Password Cannot Be Empty').not().isEmpty().trim()
    ]
};

exports.genre_Validation = () => {
    return [
        body('name').not().isEmpty().withMessage('Genre Cannot Be Empty').isLength({ min: 3, max: 8 }).withMessage('Gnere Should Atleast Contain Min 3 & Max 8 Character').trim(),
    ]
};

exports.movie_Validation = () => {
    return [
        body('movie_name').not().isEmpty().withMessage('Movie Name Cannot Be Empty').isLength({ min: 2, max: 15 }).withMessage('Movie Name Should Atleast Contain Min 2 & Max 15 Character').trim(),
        body('details', 'Details Cannot Be Empty').not().isEmpty().trim(),
        body('release_date', 'Relese Date Cannot Be Empty').not().isEmpty().trim()      
    ]
};

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    let errNEW = errors.errors
    let custArr = {}

    for (index in errNEW) {
        let keyname = errNEW[index].param
        let msgNew = errNEW[index].msg
        custArr[keyname] = msgNew
    }

    return res.status(200).json({
        status: 3,
        msgType: 'error',
        message: 'validation error',
        errors: custArr,
    });
};