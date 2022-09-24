const express = require('express')
const category = require('../schemas/category')
var router = express.Router();
const {upload}= require('./multer')
const { verify } = require('../middleware/jwt_token')

router.use(verify)

router.post('/add', upload.single('img'),async (req, res) => {
    var data = category({
        name: req.body.name,
        description: req.body.description,
        avatar: req.body.avatar
    })

    try {
        var result = await data.save();
        if (!result)
        return res.status(400).send({ message: 'category not added' })

        else return res.status(200).send({ category: result })

    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

router.get('/get', async (req, res) => {
    try {
        var data = await category.find();

        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ message: 'Error Occured', error: error })
    }

})

module.exports = router;