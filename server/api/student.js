const router = require('express').Router()
const { Student, Campus } = require('../db')

router.get('/', ({ query: { offset = 0, limit = 5 } }, res, next) => {
    offset = Number(offset)
    limit = Number(limit)
    Student.findAll({
        offset,
        limit
    }).then(data => {
        res.send({
            offset: data.length === limit ? Number(offset) + data.length : null,
            data
        })
    }).catch(() => {
        const err = new Error('There was an error')
        err.status(404)
        next(err)
    })
})
router.get('/recent', (req, res, next) => {
    Student.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 5
    }).then(students => {
        res.send(students)
    }).catch(e => {
        console.log(e)
        const err = new Error('There was an error')
        err.status(404)
        next(err)
    })
})
router.get('/:id', ({ params: { id } }, res, next) => {
    Student.findById(Number(id), {
        include: [{
            model: Campus
        }]
    }).then(({ dataValues }) => {
        res.send({ ...dataValues })
    }).catch(e => next(e))
})
router.post('/', ({ body }, res, next) => {
    console.log('BODY ', body)
    Student.create(body, {
        returning: true
    })
        .then(student => {
            res.status(201).send(student)
        })
        .catch(() => {
            const err = new Error('Invalid submission')
            err.status = 400
            next(err)
        })
})
router.delete('/:id', ({ params: { id } }, res, next) => {
    Student.destroy({
        where: {
            id: Number(id)
        }
    })
        .then(() => {
            res.status(204).send()
        }).catch((e) => {
            const err = new Error('BAD')
            err.status = 400
            next(err)
        })
})
router.put('/:id', ({ params: { id }, body }, res, next) => {
    Student.update(body, {
        where: {
            id: Number(id)
        },
        returning: true
    }).then(([_, data]) => {
        res.send(data[0])
    }).catch(() => {
        const err = new Error('Couldnt do that')
        err.status = 400
        next(err)
    })
})
module.exports = router