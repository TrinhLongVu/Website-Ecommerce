module.exports = {
    isLoggedUser: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.send('401', 'Unauthorized')
        }
    }
}