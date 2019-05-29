validatedUser = (req, res, next) => {
    req.body && Object.keys(req.body).length
    ?   req.body.name !== ''
        ?   next()
        :   res.status(400).json({message: 'Missing required field.'})
    :   res.status(400).json({message: 'Beep Boop data not found.'})
}

module.exports = validatedUser