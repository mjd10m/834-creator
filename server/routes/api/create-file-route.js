const router = require('express').Router();
const {formatDate} = require('../../utils/helpers')
const header = require('../../utils/header')
const stLoop = require('../../utils/stloop')

router.route('/')
    .post((req, res)=> {
        const timestamp = Date.now()
        const data = req.body
        const text = 
`${header(data)}
${stLoop(data)}`
        res.json(text)
})

module.exports = router;