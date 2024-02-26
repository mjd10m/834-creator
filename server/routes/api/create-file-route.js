const router = require('express').Router();
const {createHeader,createFooter} = require('../../utils/header-footer')
const stLoop = require('../../utils/stloop')
const moment = require('moment')

router.route('/')
    .post((req, res)=> {
        const data = req.body
        const text = 
`${createHeader(data)}
${stLoop(data)}
${createFooter()}`
        res.json(text)
})

module.exports = router;