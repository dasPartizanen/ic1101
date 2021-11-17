const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Note = require('../models/Note')

const router = Router()

router.post('/add',
    [
        check('title', 'Incorrect title').isLength({ min: 1 }),
        check('text', 'Incorrect text').isLength({ min: 1 }),
    ],
    auth,
    async (reg, res) => {
        try {
            const errors = validationResult(reg)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect note data'
                })
            }

            const {title, text} = reg.body

            const candidate = await Note.findOne({ title })

            if (candidate) {
                return res.status(500).json({message: 'Note exists'})
            }

            const note = new Note({
                title,
                text,
                owner: reg.user.userId,
            })

            await note.save()

            res.status(201).json(note)
        } catch (e) {
            res.status(500).json({message: 'Error on add note'})
        }
    }
)

router.get('/list', auth, async (reg, res) => {
    try {
        const notes = await Note.find({owner: reg.user.userId})
        res.json(notes)
    } catch (e) {
        res.status(500).json({message: 'Error on notes list'})
    }
})

router.get('/:id', auth, async (reg, res) => {
    try {
        const note = await Note.findById(reg.params.id)
        res.json(note)
    } catch (e) {
        res.status(500).json({message: 'Error on show note'})
    }
})

router.delete('/del/:id', auth, async (reg, res) => {
    try {
        await Note.deleteOne({ _id: reg.params.id })
        res.json({message: 'Message is deleted'})
    } catch (e) {
        res.status(500).json({message: 'Error on dell note'})
    }
})

module.exports = router