const requireAuth = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        next();
    }
    else {
        return res.status(403).send({message: "You must be logged in."})
    }
}

module.exports = requireAuth;