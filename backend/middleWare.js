const authorize = (req, res, next) => {
    const apiKey = req.headers['key'];

    if(!apiKey || apiKey !== process.env.SECRET_KEY) {
        return res.status(403).json({message: 'Forbidden'});
    }

    next();
}

module.exports = authorize;