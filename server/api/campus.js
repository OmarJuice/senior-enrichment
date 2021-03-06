const router = require('express').Router()
const { Campus, Student } = require('../db')
router.get('/', ({ query: { offset = 0, limit = 5 } }, res, next) => {
    limit = Number(limit)
    offset = Number(offset)
    Campus.findAll({
        offset,
        limit
    }).then(data => {
        res.send({
            offset: data.length === limit ? Number(offset) + data.length : null,
            data
        })
    }).catch(e => {
        next(e)
    })
})
router.get('/recent', (req, res, next) => {
    Campus.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 5
    }).then(campuses => {
        res.send(campuses)
    }).catch(e => {
        console.log(e)
        const err = new Error('There was an error')
        err.status(404)
        next(err)
    })
})
router.get('/:id', ({ params: { id } }, res, next) => {
    Campus.findById(Number(id), {
        include: [{
            model: Student
        }]
    }).then(({ dataValues }) => {
        res.send({ ...dataValues })
    }).catch(e => next(e))
})
router.post('/', ({ body }, res, next) => {
    Campus.create(body, {
        returning: true
    }).then(campus => {
        res.status(201).send(campus)
    }).catch(() => {
        const err = new Error('Invalid submission')
        err.status = 400
        next(err)
    })
})
router.delete('/:id', ({ params: { id } }, res, next) => {
    Campus.destroy({
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
    Campus.update(body, {
        where: {
            id: Number(id)
        },
        returning: true
    }).then(([_, data]) => {

        res.send(data[0])
    }).catch(() => {
        const err = new Error('Could not do that')
        err.status = 400
        next(err)
    })
})
module.exports = router