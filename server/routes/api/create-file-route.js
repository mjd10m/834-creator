const router = require('express').Router();
const {createHeader,createFooter} = require('../../utils/header-footer')
const stLoop = require('../../utils/stloop')
const {createFileName} = require('../../utils/helpers')


router.route('/')
    .post((req, res)=> {
        //const data = req.body
        const [genData, subData, depData] = req.body
        let responseData = []
        const text = 
`${createHeader(genData)}
${stLoop(genData,subData,depData)}
${createFooter()}`
        responseData.push(text)
        const fileName = createFileName()
        responseData.push(fileName)

        res.json(responseData)
})

module.exports = router;