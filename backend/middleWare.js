const authorize = (req, res, next) => {
    const apiKey = req.headers['key'];
    console.log(req.headers);
    if(!apiKey || apiKey !== process.env.SECRET_KEY) {
        return res.status(403).json({message: 'Forbidden'});
    }

    console.log('HERE');
    next();
}

module.exports = authorize;