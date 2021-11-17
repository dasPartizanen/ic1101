const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (reg, res, next) => {
    if (reg.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = reg.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: 'No authorisation'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        reg.user = decoded

        next()
    } catch (e) {
        res.status(401).json({message: 'No authorisation'})
    }
}