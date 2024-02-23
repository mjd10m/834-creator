const router = require('express').Router();
const createFileRoutes = require('./create-file-route');

router.use('/create-file', createFileRoutes);


module.exports = router;