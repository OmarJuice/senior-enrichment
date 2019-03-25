const router = require('express').Router()
const { Student, Campus } = require('../db')

router.get('/', (
    { query: { offset = 0, limit = 5 } }
    , res, next) => {
    Student.findAll({
        offset,
        limit
    }).then(students => {
        res.send({
            offset: Number(offset) + students.length,
            students
        })
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
            console.log(e);
            const err = new Error('BAD')
            err.status = 400
            next(err)
        })
})

module.exports = router