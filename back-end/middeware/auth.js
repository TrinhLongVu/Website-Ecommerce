module.exports = {
    isLoggedUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.role == 'user') {
                console.log(req.headers)
                next();
            } else {
                res.send('401', 'Unauthorized')
            }
        }

    }
}