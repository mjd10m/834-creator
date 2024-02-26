const router = require('express').Router();
const {createHeader,createFooter} = require('../../utils/header-footer')
const stLoop = require('../../utils/stloop')
const {createFileName} = require('../../utils/helpers')


router.route('/')
    .post((req, res)=> {
        const data = req.body
        let responseData = []
        const text = 
`${createHeader(data)}
${stLoop(data)}
${createFooter()}`
        responseData.push(text)
        const fileName = createFileName()
        responseData.push(fileName)

        res.json(responseData)
})

module.exports = router;