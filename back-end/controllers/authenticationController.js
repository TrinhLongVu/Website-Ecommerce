
exports.Authentication = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            status: "success",
            body: req.user
        })
    }
    else {
        res.json({
            status: "failed",
        })
    }
}