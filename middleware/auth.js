const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
        success: false,
        error: "access denied. no token provided"
    })

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            req.userId = decoded._id;
            // console.log(err);
            if (err !== null) {
                return res.status(401).json({
                    success: false,
                    error: "access denied. no token provided"
                })
            }
        });

        next();
    }
    catch (ex) {
        res.status(400).json({
            success: false,
            error: "invalid token"
        })
    }
}