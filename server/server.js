const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/api', (req, res)=> {
    const text =  Date.now()
    res.json(text)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})