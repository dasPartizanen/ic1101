const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const router = Router()

router.post(
    '/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password')
            .isLength({ min: 6 }),
        check('name', 'Incorrect name')
            .isLength({ min: 3 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const {email, password, name} = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(500).json({message: 'User exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                name,
                password: hashedPassword
            })
            await user.save()

            const newUser = await User.findOne({ email })

            const newUserId = newUser.id

            const token = jwt.sign(
                {
                    userId: newUserId
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )

            const result = {
                token,
                userId: newUserId,
                name,
            }

            res.status(201).json(result)

        } catch (e) {
            res.status(500).json({message: 'Error on registration'})
        }
})

router.post(
    '/login',
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({message: 'User does not exist'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password'})
            }

            const token = jwt.sign(
                {
                    userId: user.id
                },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )

            res.json({
                token,
                userId: user.id,
                name: user.name,
            })
        } catch (e) {
            res.status(500).json({
                message: 'Error on login'
            })
        }
})

module.exports = router
