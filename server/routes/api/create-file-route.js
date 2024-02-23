const router = require('express').Router();

router.route('/')
    .get((req, res)=> {
        console.log(req.data)
        const text = `ISA*00*          *00*          *ZZ*CHRCONVONHIX   *30*TX             *240115*1710*^*00501*000000100*1*T*:~`
        res.json(text)
    })

module.exports = router;